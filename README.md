# Factifai MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@presidio-dev/factifai-mcp-server.svg)](https://www.npmjs.com/package/@presidio-dev/factifai-mcp-server)
[<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-VS_Code?style=plastic&label=Install&color=0098FF">](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{"name":"factifai","command":"npx","args":["-y","@presidio-dev/factifai-mcp-server@latest"],"env":{"MODEL_PROVIDER":"bedrock|openai","OPENAI_API_KEY":"<your-openai-api-key>","AWS_ACCESS_KEY_ID":"<your-aws-access-key-id>","AWS_SECRET_ACCESS_KEY":"<your-aws-secret-access-key>","AWS_DEFAULT_REGION":"<your-aws-region>"}})
[<img alt="Install in VS Code Insiders (npx)" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=plastic&label=Install&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{"name":"factifai","command":"npx","args":["-y","@presidio-dev/factifai-mcp-server@latest"],"env":{"MODEL_PROVIDER":"bedrock|openai","OPENAI_API_KEY":"<your-openai-api-key>","AWS_ACCESS_KEY_ID":"<your-aws-access-key-id>","AWS_SECRET_ACCESS_KEY":"<your-aws-secret-access-key>","AWS_DEFAULT_REGION":"<your-aws-region>"}})
[<img alt="Install in Cursor (npx)" src="https://img.shields.io/badge/Cursor-Cursor?style=plastic&label=Install&color=1A1A1A">](https://cursor.com/install-mcp?name=factifai&config=eyJuYW1lIjoiZmFjdGlmYWkiLCJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwcmVzaWRpby1kZXYvZmFjdGlmYWktbWNwLXNlcnZlckBsYXRlc3QiXSwiZW52Ijp7Ik1PREVMX1BST1ZJREVSIjoiYmVkcm9ja3xvcGVuYWkifX0=)

<p>
  <img style="margin-right:18px;" src="assets/img/hai.png" alt="Hai Build" />
  <img style="margin-right:18px;" src="assets/img/amazon-q.png" alt="Amazon Q" />
  <img style="margin-right:18px;" src="assets/img/vsc.png" alt="VS Code" />
  <img style="margin-right:18px;" src="assets/img/cursor.png" alt="Cursor" />
  <img style="margin-right:18px;" src="assets/img/windsurf.png" alt="Windsurf" />
  <img style="margin-right:18px;" src="assets/img/zed.png" alt="Zed" />
</p>

A Model Context Protocol (MCP) server for [Factifai](https://github.com/presidio-oss/factif-ai) integration with any MCP-compatible AI tool. This server is designed to be tool-agnostic, meaning it can be used with any tool that supports the MCP protocol. This server currently exposes tools to create tests asynchronously and get the result of the test.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [IDE Integration](#factifai-mcp-integration-with-popular-ide-and-extension)
- [Available Tools](#available-tools)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Requirements

- Node.js >= 16.0.0
- Hai Build, Cursor, Windsurf, Claude Desktop or any MCP Client

## Installation

```bash
# Latest version
npx --yes @presidio-dev/factifai-mcp-server@latest

# Specific version
npx --yes @presidio-dev/factifai-mcp-server@1.2.3
```

We recommend `npx` to install the server, but you can use any node package manager of your preference such as `yarn`, `pnpm`, `bun`, etc.

## Configuration

with [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) with latest version:

```json
{
	"factifai": {
		"command": "npx",
		"args": ["--yes", "@presidio-dev/factifai-mcp-server@latest"],
		"env": {
			"MODEL_PROVIDER": "bedrock|openai",
			"OPENAI_API_KEY": "<your-openai-api-key>",
			"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
			"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
			"AWS_DEFAULT_REGION": "<your-aws-region>"
		},
		"disabled": false,
		"autoApprove": []
	}
}
```

with [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) with specific version:

```json
{
	"factifai": {
		"command": "npx",
		"args": ["--yes", "@presidio-dev/factifai-mcp-server@1.2.3"],
		"env": {
			"MODEL_PROVIDER": "bedrock|openai",
			"OPENAI_API_KEY": "<your-openai-api-key>",
			"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
			"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
			"AWS_DEFAULT_REGION": "<your-aws-region>"
		},
		"disabled": false,
		"autoApprove": []
	}
}
```

### Environment Variables

| Variable Name           | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `MODEL_PROVIDER`        | The model provider to use. (bedrock or openai)           |
| `OPENAI_API_KEY`        | The API key for the OpenAI model provider                |
| `AWS_ACCESS_KEY_ID`     | The AWS access key ID for the Bedrock model provider     |
| `AWS_SECRET_ACCESS_KEY` | The AWS secret access key for the Bedrock model provider |
| `AWS_DEFAULT_REGION`    | The AWS default region for the Bedrock model provider    |

### Model Provider Configuration Examples

#### Bedrock Configuration Example

```json
{
	"factifai": {
		"command": "npx",
		"args": ["--yes", "@presidio-dev/factifai-mcp-server@latest"],
		"env": {
			"MODEL_PROVIDER": "bedrock",
			"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
			"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
			"AWS_DEFAULT_REGION": "<your-aws-region>"
		},
		"disabled": false,
		"autoApprove": []
	}
}
```

#### OpenAI Configuration Example

```json
{
	"factifai": {
		"command": "npx",
		"args": ["--yes", "@presidio-dev/factifai-mcp-server@latest"],
		"env": {
			"MODEL_PROVIDER": "openai",
			"OPENAI_API_KEY": "<your-openai-api-key>"
		},
		"disabled": false,
		"autoApprove": []
	}
}
```

## Factifai MCP integration with popular IDE and extension

See the setup instructions for each

<details>

<summary><b>Install in Hai Build</b></summary>

Add the following to your `hai_mcp_settings.json` file. To open this file from Hai Build, click the "MCP Servers" icon, select the "Installed" tab, and then click "Configure MCP Servers".

See the [Hai Build MCP documentation](https://github.com/presidio-oss/cline-based-code-generator/blob/main/docs/mcp/configuring-mcp-servers.mdx) for more info.

```json
{
	"mcpServers": {
		"factifai": {
			"command": "npx",
			"args": ["-y", "@presidio-dev/factifai-mcp-server@latest"],
			"env": {
				"MODEL_PROVIDER": "bedrock|openai",
				"OPENAI_API_KEY": "<your-openai-api-key>",
				"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
				"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
				"AWS_DEFAULT_REGION": "<your-aws-region>"
			}
		}
	}
}
```

</details>

<details>

<summary><b>Install in Amazon Q Developer</b></summary>

Add the following to your Amazon Q Developer configuration file. See [MCP configuration for Q Developer in the IDE](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/mcp-ide.html#mcp-ide-configuration-add-server) for more details.

The configuration file can be stored globally at `~/.aws/amazonq/mcp.json` to be available across all your projects, or locally within your project at `.amazonq/mcp.json`.

```json
{
	"mcpServers": {
		"factifai": {
			"command": "npx",
			"args": ["-y", "@presidio-dev/factifai-mcp-server@latest"],
			"env": {
				"MODEL_PROVIDER": "bedrock|openai",
				"OPENAI_API_KEY": "<your-openai-api-key>",
				"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
				"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
				"AWS_DEFAULT_REGION": "<your-aws-region>"
			}
		}
	}
}
```

</details>

<details>

<summary><b>Install in VS Code (Copilot)</b></summary>

[<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-VS_Code?style=plastic&label=Install&color=0098FF">](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{"name":"factifai","command":"npx","args":["-y","@presidio-dev/factifai-mcp-server@latest"],"env":{"MODEL_PROVIDER":"bedrock|openai","OPENAI_API_KEY":"<your-openai-api-key>","AWS_ACCESS_KEY_ID":"<your-aws-access-key-id>","AWS_SECRET_ACCESS_KEY":"<your-aws-secret-access-key>","AWS_DEFAULT_REGION":"<your-aws-region>"}})
[<img alt="Install in VS Code Insiders (npx)" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=plastic&label=Install&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{"name":"factifai","command":"npx","args":["-y","@presidio-dev/factifai-mcp-server@latest"],"env":{"MODEL_PROVIDER":"bedrock|openai","OPENAI_API_KEY":"<your-openai-api-key>","AWS_ACCESS_KEY_ID":"<your-aws-access-key-id>","AWS_SECRET_ACCESS_KEY":"<your-aws-secret-access-key>","AWS_DEFAULT_REGION":"<your-aws-region>"}})

First, enable MCP support in VS Code by opening Settings (`Ctrl+,`), searching for `mcp.enabled`, and checking the box.

Then, add the following configuration to your user or workspace `settings.json` file. See the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

```json
"mcp": {
  "servers": {
    "factifai": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@presidio-dev/factifai-mcp-server@latest"],
      "env": {
        "MODEL_PROVIDER": "bedrock|openai",
        "OPENAI_API_KEY": "<your-openai-api-key>",
        "AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
        "AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
        "AWS_DEFAULT_REGION": "<your-aws-region>"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Cursor</b></summary>

The easiest way to install is with the one-click installation button below.

[<img alt="Install in Cursor (npx)" src="https://img.shields.io/badge/Cursor-Cursor?style=plastic&label=Install&color=1A1A1A">](https://cursor.com/install-mcp?name=factifai&config=eyJuYW1lIjoiZmFjdGlmYWkiLCJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwcmVzaWRpby1kZXYvZmFjdGlmYWktbWNwLXNlcnZlckBsYXRlc3QiXSwiZW52Ijp7Ik1PREVMX1BST1ZJREVSIjoiYmVkcm9ja3xvcGVuYWkifX0=)

Alternatively, you can manually configure the server by adding the following to your `mcp.json` file. This file can be located globally at `~/.cursor/mcp.json` or within a specific project at `.cursor/mcp.json`. See the [Cursor MCP documentation](https://docs.cursor.com/context/model-context-protocol) for more information.

```json
{
	"mcpServers": {
		"factifai": {
			"command": "npx",
			"args": ["--yes", "@presidio-dev/factifai-mcp-server@latest"],
			"env": {
				"MODEL_PROVIDER": "bedrock|openai",
				"OPENAI_API_KEY": "<your-openai-api-key>",
				"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
				"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
				"AWS_DEFAULT_REGION": "<your-aws-region>"
			}
		}
	}
}
```

</details>

<details>
<summary><b>Install in Windsurf</b></summary>

Add the following to your `~/.codeium/windsurf/mcp_config.json` file. See the [Windsurf MCP documentation](https://docs.windsurf.com/windsurf/cascade/mcp) for more information.

```json
{
	"mcpServers": {
		"factifai": {
			"command": "npx",
			"args": ["-y", "@presidio-dev/factifai-mcp-server@latest"],
			"env": {
				"MODEL_PROVIDER": "bedrock|openai",
				"OPENAI_API_KEY": "<your-openai-api-key>",
				"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
				"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
				"AWS_DEFAULT_REGION": "<your-aws-region>"
			}
		}
	}
}
```

</details>

<details>
<summary><b>Install in Zed</b></summary>

You can add the Factifai MCP server in Zed by editing your `settings.json` file (accessible via the `zed: settings` action) or by using the Agent Panel's configuration UI (`agent: open configuration`). See the [Zed MCP documentation](https://zed.dev/docs/ai/mcp#add-your-own-mcp-server) for more information.

Add the following to your `settings.json`:

```json
{
	"context_servers": {
		"factifai": {
			"command": {
				"path": "npx",
				"args": ["-y", "@presidio-dev/factifai-mcp-server@latest"],
				"env": {
					"MODEL_PROVIDER": "bedrock|openai",
					"OPENAI_API_KEY": "<your-openai-api-key>",
					"AWS_ACCESS_KEY_ID": "<your-aws-access-key-id>",
					"AWS_SECRET_ACCESS_KEY": "<your-aws-secret-access-key>",
					"AWS_DEFAULT_REGION": "<your-aws-region>"
				}
			}
		}
	}
}
```

</details>

### Available Tools

| Tool Name                  | Description                |
| -------------------------- | -------------------------- |
| `testWithFactifai`         | Start a test with Factifai |
| `getFactifaiSessionResult` | Get test result            |
| `listFactifaiSessions`     | List tests                 |

## Contributing

We welcome contributions to the Factifai MCP Server! Please see our [Contributing Guide](CONTRIBUTING.md) for more information on how to get started.

## Security

For information about our security policy and how to report security vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
