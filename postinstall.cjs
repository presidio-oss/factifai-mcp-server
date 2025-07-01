#!/usr/bin/env node

/**
 * Postinstall script for @presidio-dev/factifai-mcp-server
 *
 * This script installs Playwright browsers when the package is installed,
 * but skips installation in CI environments to improve build performance.
 */

const { execSync } = require('child_process')

// Check if we're in a CI environment
const isCI =
	process.env.CI === 'true' ||
	process.env.GITHUB_ACTIONS === 'true' ||
	process.env.CONTINUOUS_INTEGRATION === 'true' ||
	process.env.TRAVIS === 'true' ||
	process.env.CIRCLECI === 'true' ||
	process.env.JENKINS_URL ||
	process.env.BUILDKITE === 'true' ||
	process.env.DRONE === 'true' ||
	Boolean(process.env.CI)

if (isCI) {
	console.log('ℹ️  CI environment detected, skipping Playwright browser installation')
	console.log('   This speeds up your CI builds. Browsers can be installed manually if needed.')
	process.exit(0)
}

// Not in CI, install Playwright browsers
try {
	console.log('📦 Installing Playwright browsers...')
	execSync('npx playwright install --with-deps', {
		stdio: 'inherit',
		encoding: 'utf8',
	})
	console.log('✅ Playwright browsers installed successfully')
} catch (error) {
	console.error('❌ Failed to install Playwright browsers:', error.message)
	console.error('   You may need to run "npx playwright install --with-deps" manually')
	// Don't exit with error code to avoid breaking the entire installation
	// Users can manually install browsers if needed
	console.log('⚠️  Continuing with installation...')
}
