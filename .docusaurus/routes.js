import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/carbon-dao-web/blog',
    component: ComponentCreator('/carbon-dao-web/blog', '8ec'),
    exact: true
  },
  {
    path: '/carbon-dao-web/blog/archive',
    component: ComponentCreator('/carbon-dao-web/blog/archive', '453'),
    exact: true
  },
  {
    path: '/carbon-dao-web/blog/authors',
    component: ComponentCreator('/carbon-dao-web/blog/authors', '3ea'),
    exact: true
  },
  {
    path: '/carbon-dao-web/blog/tags',
    component: ComponentCreator('/carbon-dao-web/blog/tags', 'e76'),
    exact: true
  },
  {
    path: '/carbon-dao-web/blog/tags/carbondao',
    component: ComponentCreator('/carbon-dao-web/blog/tags/carbondao', 'cc7'),
    exact: true
  },
  {
    path: '/carbon-dao-web/blog/tags/hello',
    component: ComponentCreator('/carbon-dao-web/blog/tags/hello', '173'),
    exact: true
  },
  {
    path: '/carbon-dao-web/blog/welcome-to-carbondao',
    component: ComponentCreator('/carbon-dao-web/blog/welcome-to-carbondao', 'a4c'),
    exact: true
  },
  {
    path: '/carbon-dao-web/docs',
    component: ComponentCreator('/carbon-dao-web/docs', '1de'),
    routes: [
      {
        path: '/carbon-dao-web/docs',
        component: ComponentCreator('/carbon-dao-web/docs', '781'),
        routes: [
          {
            path: '/carbon-dao-web/docs',
            component: ComponentCreator('/carbon-dao-web/docs', '567'),
            routes: [
              {
                path: '/carbon-dao-web/docs/business/company-description',
                component: ComponentCreator('/carbon-dao-web/docs/business/company-description', 'ac1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/business/executive-summary',
                component: ComponentCreator('/carbon-dao-web/docs/business/executive-summary', '5e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/business/market-analysis',
                component: ComponentCreator('/carbon-dao-web/docs/business/market-analysis', '919'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/governance/framework',
                component: ComponentCreator('/carbon-dao-web/docs/governance/framework', '870'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/governance/risk-management',
                component: ComponentCreator('/carbon-dao-web/docs/governance/risk-management', 'f36'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/governance/tokenomics',
                component: ComponentCreator('/carbon-dao-web/docs/governance/tokenomics', 'a6b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/introduction',
                component: ComponentCreator('/carbon-dao-web/docs/introduction', '4b4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/quick-start',
                component: ComponentCreator('/carbon-dao-web/docs/quick-start', '14a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/technical/api-specifications',
                component: ComponentCreator('/carbon-dao-web/docs/technical/api-specifications', 'a23'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/technical/architecture',
                component: ComponentCreator('/carbon-dao-web/docs/technical/architecture', '071'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/technical/deployment',
                component: ComponentCreator('/carbon-dao-web/docs/technical/deployment', 'ee2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/carbon-dao-web/docs/technical/smart-contracts',
                component: ComponentCreator('/carbon-dao-web/docs/technical/smart-contracts', '36d'),
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
    path: '/carbon-dao-web/',
    component: ComponentCreator('/carbon-dao-web/', 'cc9'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
