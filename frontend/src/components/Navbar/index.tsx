import React from "react";
import Link from "@/components/Link";
import styled from "styled-components";
import Image from "next/image";
import simplimuvLogo from "../../../public/images/simplimuv-logo.png";

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

const NavLink = styled(Link)<props>`
  color: black;
  margin-left: 16px;
  transition: color 0.3s;

  &:hover {
    color: #903df7;
  }
  ${({ active }) =>
    active &&
    `
    font-weight: bold;
    color: #903df7;
    `}
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Icon width={300} height={300} src={simplimuvLogo} alt="Icon" />
      <LinkContainer>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/management">Management</Link>
      </LinkContainer>
    </NavbarContainer>
  );
};

export default Navbar;
