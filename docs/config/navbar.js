/**
 * If changes to this config do not take effect, restart the server.
 */
const ORGANIZATION_NAME = 'ratanachh';
const PROJECT_NAME = 'lowcode-engine';
const REPO_URL = `https://github.com/${ORGANIZATION_NAME}/${PROJECT_NAME}`;
const RAW_STATIC_IMG = `https://raw.githubusercontent.com/${ORGANIZATION_NAME}/${PROJECT_NAME}/main/docs/static/img`;

module.exports = {
  title: '',
  logo: {
    alt: 'LowCode-Engine',
    src: `${RAW_STATIC_IMG}/logo.svg`,
    srcDark: `${RAW_STATIC_IMG}/logo.svg`,
  },
  items: [
    {
      type: 'doc',
      docId: 'guide/quickStart/intro',
      position: 'left',
      label: 'Docs',
    },
    {
      type: 'doc',
      docId: 'api/index',
      position: 'left',
      label: 'API',
    },
    {
      type: 'doc',
      docId: 'specs/lowcode-spec',
      position: 'left',
      label: 'Specs',
    },
    {
      type: 'doc',
      docId: 'faq/index',
      position: 'left',
      label: 'FAQ',
    },
    {
      type: 'doc',
      docId: 'article/index',
      position: 'left',
      label: 'Articles',
    },
    {
      type: 'doc',
      docId: 'video/index',
      position: 'left',
      label: 'Videos',
    },
    {
      type: 'doc',
      docId: 'demoUsage/intro',
      position: 'left',
      label: 'Demo Guide',
    },
    {
      to: '/community/issue',
      position: 'left',
      label: 'Community',
      activeBaseRegex: '/community/',
    },
    {
      href: REPO_URL,
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub repository',
    },
    {
      type: 'doc',
      docId: 'participate/index',
      position: 'right',
      label: 'Contribute',
    },
    {
      type: 'search',
      position: 'right',
    },
  ],
};
