import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Carbon Credit Trading',
    image: '/img/carbon-trading.svg',
    description: (
      <>
        Trade carbon credits with transparency and trust using our blockchain-based
        marketplace. Verified projects, instant settlements, and complete traceability.
      </>
    ),
  },
  {
    title: 'Decentralized Governance',
    image: '/img/governance.svg',
    description: (
      <>
        Participate in platform governance through our DAO structure. Stake tokens,
        vote on proposals, and help shape the future of carbon markets.
      </>
    ),
  },
  {
    title: 'Project Registry',
    image: '/img/registry.svg',
    description: (
      <>
        Register and verify carbon credit projects with our comprehensive registry
        system. Ensure quality and compliance with international standards.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={image} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}