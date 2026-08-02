/* eslint-disable @typescript-eslint/no-require-imports */
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const navbar = require('./config/navbar');

const ORGANIZATION_NAME = 'ratanachh';
const PROJECT_NAME = 'lowcode-engine';
const GITHUB_PAGES_URL = `https://${ORGANIZATION_NAME}.github.io`;
const BASE_URL = `/${PROJECT_NAME}/`;
const REPO_URL = `https://github.com/${ORGANIZATION_NAME}/${PROJECT_NAME}`;
const RAW_STATIC_IMG = `https://raw.githubusercontent.com/${ORGANIZATION_NAME}/${PROJECT_NAME}/main/docs/static/img`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Low-Code Engine',
  tagline: 'Low-Code Engine is awesome!',
  url: GITHUB_PAGES_URL,
  baseUrl: BASE_URL,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: `${RAW_STATIC_IMG}/logo.svg`,

  // GitHub Pages deployment config
  organizationName: ORGANIZATION_NAME,
  projectName: PROJECT_NAME,
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./config/sidebarsCommunity.js'),
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./config/sidebars.js'),
          editUrl: `${REPO_URL}/tree/main/docs/`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar,
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} ${ORGANIZATION_NAME}. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    // Images exported from Yuque check referrer; disable it so those images can load
    metadata: [{ name: 'referrer', content: 'no-referrer' }],
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 6,
    },
  },

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
      },
    ],
  ],
};

module.exports = config;
