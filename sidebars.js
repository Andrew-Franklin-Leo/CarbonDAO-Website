/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start',
    },
    {
      type: 'category',
      label: 'Business',
      items: [
        'business/executive-summary',
        'business/company-description',
        'business/market-analysis',
      ],
    },
    {
      type: 'category',
      label: 'Technical',
      items: [
        'technical/architecture',
        'technical/smart-contracts',
        'technical/api-specifications',
        'technical/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'governance/framework',
        'governance/tokenomics',
        'governance/risk-management',
      ],
    },
  ],
};

module.exports = sidebars;