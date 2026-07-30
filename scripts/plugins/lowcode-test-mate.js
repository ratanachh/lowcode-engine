/**
 * Local JS shim of @alilc/lowcode-test-mate/plugin.
 * Node 22+ rejects requiring .ts files under node_modules
 * (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING).
 */
module.exports = ({ onGetJestConfig }) => {
  onGetJestConfig((jestConfig) => jestConfig);
};
