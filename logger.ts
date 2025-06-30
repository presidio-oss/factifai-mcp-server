import pino from 'pino'
import path from 'path'
import os from 'os'
import { existsSync, mkdirSync } from 'fs'

const logsDir = path.join(os.homedir(), '.factifai', 'logs')
if (!existsSync(logsDir)) {
	mkdirSync(logsDir, { recursive: true })
}

const logger = pino(
	{
		level: 'info',
	},
	pino.destination(path.join(os.homedir(), '.factifai', 'logs', 'factifai.log'))
)

export default logger
