---
title: Development Collaboration Workflow
sidebar_position: 2
---

## Code Style

The engine project uses eslint and stylelint. Code style is checked on every git commit. If there are errors, fix them before committing. (**Do not use `-n` to skip hooks — GitHub workflow lint checks will still catch you. Give up, young one~**)

## Testing

Before each commit, run unit tests locally and only submit your MR after they pass.

If you add new functionality, **add corresponding unit tests**. Core engine modules currently have 80%+ unit test coverage. Lowering coverage will cause the change to be rejected.

Running unit tests:

1. Run `npm run build` at the project root
2. If you changed only one package, e.g. designer, run `npm test` in that package directory
3. (Or) If you changed multiple packages, run `npm test` at the root

## Commit Style

Requirements:

1. Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

   <img src="https://img.alicdn.com/imgextra/i3/O1CN01M9UzVM1iqYpyxECdV_!!6000000004464-2-tps-2070-594.png" width="700"/>

2. One bugfix / feature per commit. If not, rebase before submitting your MR — avoid piles of useless or experimental commits.

Benefits: The engine's commit history stays clear — **each commit does one definite thing, and the changelog can be generated automatically**. If a commit introduces a bug, it is also easy to fix quickly via rebase drop and similar approaches.

## Branch Usage

- **main**: The most stable branch; matches npm `latest` packages
- **develop**: Development branch with the latest verified features and bugfixes; the **target branch for Pull Requests**
- **release** branches
  - Official release branches named `release/x.y.z`, usually cut from develop for release; `x.y.z` is the version to publish
  - Beta release branches named `release/x.y.z-beta(\.\d+)?` for quick validation and npm beta publishes

After beta validation, beta release branches often contain useless commits (e.g. lerna package.json changes), so they are not merged directly into develop. Instead, branch from develop, cherry-pick useful commits from the beta release branch onto the new branch, then open a PR to develop.

## Engine Release Process

For day-to-day work, branch from develop, self-test and pass unit tests, then open a PR to develop. The release owner cuts a `release/1.0.z` branch from develop~

### Version Planning

> This is the ideal cadence; actual timing may vary

- Regular iteration every 2 weeks, usually mid-month or end of month. The last beta goes out two days before release day; new PRs are generally not accepted. After a 2-day gray period, the stable release ships.
- Emergency iterations can ship at any time
- Major feature releases, 2–4 times per year

### Release Steps

> **Publishing requires permissions. If you need a release soon after your PR is merged, you can [join the contributor discussion group](../participate/#join-the-contributor-group).**

#### Stable Release

Steps (example: releasing version 1.0.0):

1. git checkout develop
   ```bash
   git checkout develop
   ```
2. Create the release branch
   ```bash
   git checkout -b release/1.0.0
   ```
3. build
   ```bash
   npm run build
   ```
4. Publish to npm
   ```bash
   npm run pub
   ```
5. Sync to tnpm, alifd CDN, and uipaas CDN (this syncs npm packages to Alibaba's internal registry; alifd CDN depends on the internal npm source)
   ```bash
   tnpm run sync
   tnpm run syncOss
   ```
6. Update the [release notes](https://github.com/alibaba/lowcode-engine/releases)
7. Merge `release/x.x.x` into main
8. Merge main into develop

For beta releases, steps (example: releasing version 1.0.1):

#### First beta for a minor (y) version, e.g. 1.1.0-beta.0

1. Check out develop
   ```bash
   git checkout develop
   ```
   Pull latest if needed
   ```bash
   git pull
   ```
2. Create the release branch; example for version 1.1.0
   ```bash
   git checkout -b release/1.1.0-beta
   git push --set-upstream origin release/1.1.0-beta
   ```
3. build
   ```bash
   npm run build
   ```
4. Publish; requires `@alilc` scope publish permission
   ```bash
   npm run pub:preminor
   ```
5. Sync to tnpm, alifd CDN, and uipaas CDN
   ```bash
   tnpm run sync
   tnpm run syncOss
   ```

#### First beta for a patch (z) version, e.g. 1.0.1-beta.0

1. Check out develop
   ```bash
   git checkout develop
   ```
   Pull latest if needed
   ```bash
   git pull
   ```
2. Create the release branch; example for version 1.0.1
   ```bash
   git checkout -b release/1.0.1-beta
   git push --set-upstream origin release/1.0.1-beta
   ```
3. build
   ```bash
   npm run build
   ```
4. Publish; requires `@alilc` scope publish permission
   ```bash
   npm run pub:prepatch
   ```
5. Sync to tnpm, alifd CDN, and uipaas CDN
   ```bash
   tnpm run sync
   tnpm run syncOss
   ```

#### Non-first beta for a version, e.g. 1.0.1-beta.0 -> 1.0.1-beta.1

1. Switch to the release branch
   ```bash
   git checkout release/1.0.1-beta
   ```
2. Rebase onto latest develop
   ```bash
   git rebase origin/develop
   ```
3. build
   ```bash
   npm run build
   ```
4. Publish; requires `@alilc` scope publish permission **_command differs from first beta_**
   ```bash
   npm run pub:prerelease
   ```
5. Sync to tnpm, alifd CDN, and uipaas CDN
   ```bash
   tnpm run sync
   tnpm run syncOss
   ```

## DEMO Release Process

1. **Update the version**
   Manually update the version in package.json
2. **build**
   ```bash
   npm run build
   ```
3. publish (requires npm publish permission)
   ```bash
   npm run pub
   ```
   For beta:
   ```bash
   npm publish --tag beta
   ```
4. Sync to tnpm, alifd CDN, and uipaas CDN
   ```bash
   tnpm run sync
   tnpm run syncOss
   ```

**Site goes live**
The demo version must be updated through Alibaba's internal systems for the official site to reflect the change.
