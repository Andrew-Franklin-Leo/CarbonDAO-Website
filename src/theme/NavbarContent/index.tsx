import React from 'react';
import NavbarContent from '@theme-original/NavbarContent';
import type NavbarContentType from '@theme/NavbarContent';
import type {WrapperProps} from '@docusaurus/types';
import MobileNav from '@site/src/components/MobileNav';

type Props = WrapperProps<typeof NavbarContentType>;

export default function NavbarContentWrapper(props: Props): JSX.Element {
  return (
    <>
      <NavbarContent {...props} />
      <MobileNav />
    </>
  );
}