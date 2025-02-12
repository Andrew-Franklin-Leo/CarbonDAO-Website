// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CarbonDAO Documentation',
  tagline: 'Decentralized Carbon Credit Trading Platform',
  url: 'https://carbon-dao.github.io',
  baseUrl: '/carbon-dao-web/',
  onBrokenLinks: 'warn', // Changed from 'throw' to 'warn'
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'carbon-dao',
  projectName: 'carbon-dao-web',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/carbon-dao/carbon-dao-web/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/carbon-dao/carbon-dao-web/tree/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'CarbonDAO',
        logo: {
          alt: 'CarbonDAO Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/carbon-dao/carbon-dao-web',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/introduction',
              },
              {
                label: 'Quick Start',
                to: '/docs/quick-start',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/carbondao',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/carbondao',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/carbon-dao/carbon-dao-web',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CarbonDAO. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;