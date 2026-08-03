// Test the basic functionality of standalone mode
// Note 1: To test a specific file, append it directly: node scripts/test-standalone.js tests/public/rax-app.test.ts
// Note 2: To run a specific test case, append `-t xxx`: node scripts/test-standalone.js tests/public/rax-app.test.ts -t demo01
const { spawnSync } = require('child_process');

// Make sure to build first
const buildResult = spawnSync('npm', ['run', 'build:standalone'], {
  shell: true,
  stdio: 'inherit',
});
if (buildResult.status) {
  process.exit(buildResult.status);
}

// Then run only the specified test cases
const testResult = spawnSync('npx', ['jest', ...process.argv.slice(2)], {
  env: {
    ...process.env,
    TEST_TARGET: 'standalone',
  },
  shell: true,
  stdio: 'inherit',
});
process.exit(testResult.status == null ? 1 : testResult.status);
