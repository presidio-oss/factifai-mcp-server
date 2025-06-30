# Contributing to Factifai MCP Server

Thank you for your interest in contributing to the Factifai MCP Server! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with the following information:

- A clear, descriptive title
- A detailed description of the issue
- Steps to reproduce the problem
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment information (OS, Node.js version, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- A clear, descriptive title
- A detailed description of the proposed feature
- Any relevant examples or mockups
- An explanation of why this feature would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/) specification
6. Push to your branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

#### Pull Request Guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages
- Include tests for new features or bug fixes
- Update documentation as needed
- Ensure all tests pass
- Keep pull requests focused on a single concern

## Development Setup

This project uses [npm](https://www.npmjs.com/) for development and package management. [Bun](https://bun.sh/) is supported as an optional alternative.

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- (Optional) [Bun](https://bun.sh/) v1.0+

### Install dependencies

```sh
npm install
```

Or, with Bun (optional):

```sh
bun install
```

### Useful scripts

- **Start development mode (watch + MCP inspector):**
  ```sh
  npm run dev
  ```
- **Build for production:**
  ```sh
  npm run build
  ```
- **Link CLI locally:**
  ```sh
  npm run dev:link
  ```

### Scripts reference

- `dev:mcp`: Run MCP inspector for the server
- `dev:watch`: Build and watch TypeScript files
- `dev`: Run both dev:watch and dev:mcp concurrently
- `dev:link`: Link the CLI locally
- `build`: Build the project
- `postinstall`: Install Playwright dependencies

### Notes

- All commands should use `npm run <script>` by default.
- See `package.json` for more scripts and details.

## Coding Standards

- Follow the existing code style
- Write clear, descriptive comments
- Include JSDoc for public APIs
- Write tests for new functionality

## Documentation

- Update documentation for any changed functionality
- Use clear, concise language
- Include examples where appropriate

## Review Process

All submissions require review. We use GitHub pull requests for this purpose.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
