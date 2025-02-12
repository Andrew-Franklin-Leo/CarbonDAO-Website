import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Take Climate Action Today</h1>
        <p className="hero__subtitle">
          Join thousands making a real impact through verified carbon credits
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/quick-start">
            Start Your Green Journey →
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomePageStatistics() {
  return (
    <section className={styles.statistics}>
      <div className="container">
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <h2>500K+</h2>
            <p>Tonnes of CO₂ Offset</p>
          </div>
          <div className={styles.statItem}>
            <h2>10K+</h2>
            <p>Active Traders</p>
          </div>
          <div className={styles.statItem}>
            <h2>50+</h2>
            <p>Verified Projects</p>
          </div>
          <div className={styles.statItem}>
            <h2>$5M+</h2>
            <p>Environmental Impact</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePageTestimonials() {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <p>"CarbonDAO made it incredibly easy for our company to achieve carbon neutrality. The platform is intuitive and transparent."</p>
            <div className={styles.testimonialAuthor}>
              <strong>Sarah Chen</strong>
              <span>Sustainability Director, TechCorp</span>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <p>"As an individual investor, I appreciate how CarbonDAO simplifies carbon credit trading while ensuring real environmental impact."</p>
            <div className={styles.testimonialAuthor}>
              <strong>Michael Thompson</strong>
              <span>Individual Investor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Start Making a Difference Today</h2>
          <p>Join the growing community of climate-conscious individuals and businesses making real environmental impact through carbon credits.</p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/introduction">
              Learn More
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/quick-start">
              Start Trading
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Carbon Credit Trading Made Simple"
      description="Trade carbon credits efficiently and make a real environmental impact through our decentralized platform.">
      <HomepageHeader />
      <main>
        <HomePageStatistics />
        <HomepageFeatures />
        <HomePageTestimonials />
        <HomePageCTA />
      </main>
    </Layout>
  );
}