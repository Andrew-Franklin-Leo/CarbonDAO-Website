import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '885'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/carbondao',
    component: ComponentCreator('/blog/tags/carbondao', 'e54'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '20c'),
    exact: true
  },
  {
    path: '/blog/welcome-to-carbondao',
    component: ComponentCreator('/blog/welcome-to-carbondao', '1d1'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '135'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '8d8'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '17f'),
            routes: [
              {
                path: '/docs/business/company-description',
                component: ComponentCreator('/docs/business/company-description', '424'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/business/executive-summary',
                component: ComponentCreator('/docs/business/executive-summary', 'b6c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/business/market-analysis',
                component: ComponentCreator('/docs/business/market-analysis', '3ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/governance/framework',
                component: ComponentCreator('/docs/governance/framework', '331'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/governance/risk-management',
                component: ComponentCreator('/docs/governance/risk-management', 'c5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/governance/tokenomics',
                component: ComponentCreator('/docs/governance/tokenomics', '766'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction',
                component: ComponentCreator('/docs/introduction', 'f7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/quick-start',
                component: ComponentCreator('/docs/quick-start', 'b74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/technical/api-specifications',
                component: ComponentCreator('/docs/technical/api-specifications', '369'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/technical/architecture',
                component: ComponentCreator('/docs/technical/architecture', '601'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/technical/deployment',
                component: ComponentCreator('/docs/technical/deployment', 'b31'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/technical/smart-contracts',
                component: ComponentCreator('/docs/technical/smart-contracts', '7ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
