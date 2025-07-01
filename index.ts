#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { spawn } from 'child_process'
import { executeBrowserTask } from '@presidio-dev/factifai-agent'
import pkg from './package.json' assert { type: 'json' }
import logger from '@/logger'
import { argv } from 'process'
import path from 'path'
import os from 'os'
import { readFileSync, readdirSync } from 'node:fs'

const enum FactifaiSessionStatus {
	PENDING = 'pending',
	RUNNING = 'running',
	COMPLETED = 'completed',
	FAILED = 'failed',
}

interface FactifaiSession {
	sessionId: string
	task: string
	result?: string
	error?: string
	status: FactifaiSessionStatus
}

const readJUNITXML = (sessionId: string): string | undefined => {
	try {
		const reportsDir = path.join(os.homedir(), '.factifai', 'factifai', sessionId, 'reports')
		const files = readdirSync(reportsDir).filter(
			(f) => f.startsWith('test-report-') && f.endsWith('.xml')
		)
		if (files.length === 0) return undefined
		return readFileSync(path.join(reportsDir, files[0]!), 'utf8')
	} catch (error) {
		logger.error({ error }, 'Error reading JUnit XML')
		return undefined
	}
}

const hasValidEnv = () => {
	const modelProviderSchema = z.object({
		MODEL_PROVIDER: z.enum(['openai', 'bedrock']),
	})
	const modelProviderResult = modelProviderSchema.safeParse(process.env)
	if (!modelProviderResult.success) {
		return {
			success: false,
			error: modelProviderResult.error.message,
		}
	}
	const modelProvider = modelProviderResult.data.MODEL_PROVIDER

	if (modelProvider === 'openai') {
		const openaiSchema = z.object({
			OPENAI_API_KEY: z.string(),
		})
		const openaiResult = openaiSchema.safeParse(process.env)
		if (!openaiResult.success) {
			return {
				success: false,
				error: openaiResult.error.message,
			}
		}
	} else if (modelProvider === 'bedrock') {
		const bedrockSchema = z.object({
			AWS_ACCESS_KEY_ID: z.string(),
			AWS_SECRET_ACCESS_KEY: z.string(),
			AWS_DEFAULT_REGION: z.string(),
		})
		const bedrockResult = bedrockSchema.safeParse(process.env)
		if (!bedrockResult.success) {
			return {
				success: false,
				error: bedrockResult.error.message,
			}
		}
	}

	return {
		success: true,
		error: undefined,
		data: { modelProvider },
	}
}

class FactifaiSessionManager {
	private sessions: Map<string, FactifaiSession> = new Map()

	constructor() {
		this.sessions = new Map()
	}

	createSession(task: string): FactifaiSession {
		const sessionId = `factifai-mcp-session-${Date.now()}`
		const session: FactifaiSession = {
			sessionId,
			task,
			status: FactifaiSessionStatus.PENDING,
		}
		this.sessions.set(sessionId, session)
		return session
	}

	getSession(sessionId: string): FactifaiSession | undefined {
		return this.sessions.get(sessionId)
	}

	deleteSession(sessionId: string): void {
		this.sessions.delete(sessionId)
	}

	updateSession(sessionId: string, session: Partial<FactifaiSession>): void {
		const existingSession = this.getSession(sessionId)
		if (existingSession) {
			this.sessions.set(sessionId, { ...existingSession, ...session })
		}
	}

	listSessions(status?: FactifaiSessionStatus): FactifaiSession[] {
		if (status) {
			return Array.from(this.sessions.values()).filter((s) => s.status === status)
		}
		return Array.from(this.sessions.values())
	}
}

const processArguments = argv.slice(2)
const isChildProcess = processArguments.includes('--run-browser-task')
const sessionManager = new FactifaiSessionManager()

async function runBrowserTaskInChildProcess(session: FactifaiSession): Promise<boolean> {
	return new Promise((resolve, reject) => {
		logger.debug({ argv }, 'Running browser task in child process')
		const child = spawn(
			argv[0]!,
			[argv[1]!, '--run-browser-task', `"${session.task}"`, `"${session.sessionId}"`],
			{
				cwd: path.join(os.homedir(), '.factifai'),
				stdio: ['ignore', 'pipe', 'pipe'],
				env: {
					...process.env,
				},
			}
		)

		child.on('spawn', () => {
			sessionManager.updateSession(session.sessionId, {
				status: FactifaiSessionStatus.RUNNING,
			})
			logger.debug({ session }, 'Child process spawned, updating session status to running')
		})

		child.on('error', (err) => {
			sessionManager.updateSession(session.sessionId, {
				status: FactifaiSessionStatus.FAILED,
				error: err.message,
			})
			logger.error({ err }, 'Error running browser task')
			reject(err)
		})

		child.on('exit', (code, signal) => {
			if (code !== 0) {
				sessionManager.updateSession(session.sessionId, {
					status: FactifaiSessionStatus.FAILED,
					error: `Child process failed with code ${code} and signal ${signal}`,
				})
				logger.error({ code, signal }, 'Child process failed')
				reject(new Error(`Child process failed with code ${code} and signal ${signal}`))
			}
			const result =
				readJUNITXML(session.sessionId) ||
				`The test is completed but the report is not available yet, you may check back later.`
			sessionManager.updateSession(session.sessionId, {
				status: FactifaiSessionStatus.COMPLETED,
				result,
			})
			logger.debug({ code, signal }, 'Child process completed')
			server.server.notification({
				method: 'factifai.sessionCompleted',
				params: {
					sessionId: session.sessionId,
					result: result,
				},
			})
			resolve(true)
		})
	})
}

const server = new McpServer({
	name: pkg.name,
	version: pkg.version,
	title: pkg.description,
})

server.registerTool(
	'testWithFactifai',
	{
		title: 'Test with Factifai',
		description: `AI-driven browser automation testing using natural language instructions, only available for websites that are accessible via a browser.
    eg: "Navigate to duckduckgo.com and search for 'testing automation'",
    This will execute the given task in real browser and test the requested things and return the result.
    The test are long running so it will not wait for the test to complte, instead it will return the session id and you can use it to get the result later.
    The session id is a unique identifier for the test and it will be used to get the result later.
    The result will be returned in the format of a JSON object with the following fields:
    - sessionId: The session id of the test
    - status: The status of the test
    - result: The result of the test, it will be a JUnit XML string
    - error: Any error that occurred during the test
    `,
		inputSchema: {
			task: z.string().default(`Navigate to duckduckgo.com and search for 'testing automation'`),
		},
	},
	async ({ task }) => {
		const { success, error, data } = hasValidEnv()
		if (!success) {
			return {
				content: [{ type: 'text', text: `Error: ${error}` }],
			}
		}
		const session = sessionManager.createSession(task)
		runBrowserTaskInChildProcess(session)
		return {
			content: [
				{
					type: 'text',
					text: `Testing session has been created, you may see a browser window open and auto test wuth Factifai, here is the full session object you may use to get the result later:\n\n ${JSON.stringify(
						session,
						null,
						2
					)}`,
				},
			],
		}
	}
)

server.registerTool(
	'getFactifaiSessionResult',
	{
		title: 'Get Factifai Session Result',
		description: 'Get the result of a Factifai session',
		inputSchema: { sessionId: z.string() },
	},
	async ({ sessionId }) => {
		const session = sessionManager.getSession(sessionId)
		if (!session) {
			return {
				content: [{ type: 'text', text: `Testing session not found` }],
			}
		}
		return {
			content: [
				{
					type: 'text',
					text: `Testing session result:\n\n ${JSON.stringify(session, null, 2)}`,
				},
			],
		}
	}
)

server.registerTool(
	'listFactifaiSessions',
	{
		title: 'List Factifai Sessions',
		description: 'List all Factifai sessions',
		inputSchema: {
			status: z.enum(['pending', 'running', 'completed', 'failed']).optional(),
		},
	},
	async ({ status }) => {
		const sessions = sessionManager.listSessions(status as FactifaiSessionStatus)
		return {
			content: [
				{
					type: 'text',
					text: `Testing sessions:\n\n ${JSON.stringify(sessions, null, 2)}`,
				},
			],
		}
	}
)

if (isChildProcess) {
	logger.debug({ argv }, 'Executing browser task in child process')
	const task = argv[3]
	const sessionId = argv[4]
	if (!task || !sessionId) {
		console.error('Task and sessionId are required arguments.')
		process.exit(1)
	}
	logger.debug({ task, sessionId }, 'Executing browser task')
	executeBrowserTask(task.replaceAll('"', ''), sessionId.replaceAll('"', ''), {
		noReport: false,
		skipAnalysis: false,
		reportFormat: 'xml',
	})
		.then((result) => {
			console.log(JSON.stringify(result))
			process.exit(0)
		})
		.catch((err) => {
			console.error(JSON.stringify({ error: err.message }))
			process.exit(1)
		})
} else {
	logger.debug({}, 'Starting Factifai MCP Server')
	const transport = new StdioServerTransport()
	await server.connect(transport)
}
