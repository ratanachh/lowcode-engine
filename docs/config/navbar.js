/**
 * If changes to this config do not take effect, restart the server.
 */
module.exports = {
  title: '',
  logo: {
    alt: 'LowCode-Engine',
    src: 'https://img.alicdn.com/imgextra/i2/O1CN01uv6vu822RBCSYLro2_!!6000000007116-55-tps-139-26.svg',
    srcDark: 'https://tianshu.alicdn.com/052a190e-c961-4afe-aa4c-49ee9722952d.svg',
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
    // Version switcher — enable if needed
    // {
    //   type: 'docsVersionDropdown',
    //   position: 'right',
    //   dropdownActiveClassDisabled: true,
    // },
    // {
    {
      href: 'https://github.com/alibaba/lowcode-engine',
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
