# How to contribute

1. Pull the latest code, switch to the `develop` branch, and create a feature or hotfix branch from `develop`.
2. From the `lowcode-engine` project root, run `lerna bootstrap && lerna run build --scope "@rchh/lowcode-types"` to install dependencies and build.
3. Under `lowcode-engine/modules/code-generator`, install dependencies (`npm i`), then run `npm test` to check that all cases pass (if network is poor, consider using [cnpm — China's NPM mirror](https://npmmirror.com/)).
4. Add test cases for your feature or bug under the `tests` directory.
5. Change code under `src`, then run `npm test` or `npm start` to start jest for debugging.
6. When all tests pass, open an MR to @牧毅 — you will get feedback within 1 business day.

You are also welcome to reach out to @牧毅 privately beforehand, or join the low-code rendering / code-generation service VIP user group for discussion.

# FAQ

## How do I view unit test coverage?

Run `npm test:cov`. Coverage reports will be generated under the `coverage` directory.

## How do I run a single test case?

```sh
npm test -t 'demo2-utils-name-alias'
```

## Update expected output for a specific test case:

```sh
npm test:update-snapshots -t 'demo2-utils-name-alias'
```

## How do I run a single test file?

Run `npx jest <path-to-test-file>`, for example:

```sh
npx jest tests/plugins/common/requireUtils.test.ts
```

## How do I debug a test case?

Set breakpoints in VSCode where needed, open the VSCode JavaScript Debug Terminal, and run `npx jest tests/path/to/your/test/file.ts` or `npx jest -t your-test-case-title` — execution will pause at breakpoints so you can debug.
