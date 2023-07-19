import React from 'react';
import Link from '@/components/Link';
import styled from 'styled-components';
import Image from 'next/image';
import simplimuvLogo from '../../../public/images/simplimuv-logo.png';
import { useRouter } from 'next/router';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Icon = styled(Image)`
  width: 170px;
  height: 35px;
`;
interface props {
  active?: boolean;
}

const Container = styled.div`
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const Navbar = () => {
  const router = useRouter();

  return (
    <NavbarContainer>
      <Container>
        <Icon width={300} height={300} src={simplimuvLogo} alt='Icon' />
        <LinkContainer>
          <Link href='/' active={router.pathname === '/'}>
            Home
          </Link>
          <Link href='/products' active={router.pathname === '/products'}>
            Products
          </Link>
          <Link href='/management' active={router.pathname === '/management'}>
            Management
          </Link>
        </LinkContainer>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
