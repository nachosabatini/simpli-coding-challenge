import React from "react";
import styled from "styled-components";
import NextLink from "next/link";

const StyledLink = styled(NextLink)<{
  underline: boolean;
  color: string;
  active?: boolean;
}>`
  color: ${(props) => (props.color === "white" ? "white" : "black")};
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  transition: color 0.3s;
  margin-left: 16px;
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

interface LinkProps {
  href: string;
  color?: "white" | "black";
  underline?: boolean;
  children: React.ReactNode;
}

const Link = ({
  href,
  color = "black",
  underline = false,
  children,
}: LinkProps) => {
  return (
    <StyledLink color={color} underline={underline} href={href}>
      {children}
    </StyledLink>
  );
};

export default Link;
