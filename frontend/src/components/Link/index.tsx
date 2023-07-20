import styled from 'styled-components';
import NextLink from 'next/link';
import { FC } from 'react';
interface StyledLinkProps {
  underline: boolean;
  color: string;
  active?: boolean;
}

const StyledLink = styled(NextLink).withConfig({
  shouldForwardProp: (prop) => !['color', 'underline', 'active'].includes(prop),
})<StyledLinkProps>`
  color: ${(props) => (props.color === 'white' ? 'white' : 'black')};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
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
  color?: 'white' | 'black';
  underline?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

const Link: FC<LinkProps> = ({
  href,
  color = 'black',
  underline = false,
  active = false,
  children,
}) => {
  return (
    <StyledLink color={color} underline={underline} href={href} active={active}>
      {children}
    </StyledLink>
  );
};

export default Link;
