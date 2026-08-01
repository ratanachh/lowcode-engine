const fs = require('fs');
const { join } = require('path');
const esModules = [].join('|');
const pkgNames = fs.readdirSync(join('..')).filter(pkgName => !pkgName.startsWith('.'));

const jestConfig = {
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})/`,
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
};

// Only map packages within this repository
jestConfig.moduleNameMapper = {};
jestConfig.moduleNameMapper[`^@rchh/lowcode\\-(${pkgNames.join('|')})$`] = '<rootDir>/../$1/src';

module.exports = jestConfig;