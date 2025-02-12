import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function MobileNav(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Documentation', to: '/docs/introduction' },
    { label: 'Quick Start', to: '/docs/quick-start' },
    { label: 'Blog', to: '/blog' },
  ];

  return (
    <div className={styles.mobileNavWrapper}>
      <button
        className={clsx(styles.hamburger, isOpen && styles.active)}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={clsx(styles.mobileMenu, isOpen && styles.isOpen)}>
        <div className={styles.mobileNav}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={styles.mobileNavLink}
              onClick={toggleMenu}
            >
              {item.label}
            </Link>
          ))}
          
          <div className={styles.mobileNavCta}>
            <Link
              className="button button--primary button--lg"
              to="/docs/quick-start"
              onClick={toggleMenu}
            >
              Start Trading
            </Link>
          </div>

          <div className={styles.mobileNavFooter}>
            <p>Join the green revolution</p>
            <div className={styles.socialLinks}>
              <a href="https://twitter.com/carbondao" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://discord.gg/carbondao" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}