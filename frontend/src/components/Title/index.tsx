import React, { ReactNode, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingStyles = {
  1: css`
    font-size: 2.5rem;
    font-weight: bold;
  `,
  2: css`
    font-size: 2rem;
    font-weight: bold;
  `,
  3: css`
    font-size: 1.75rem;
    font-weight: bold;
  `,
  4: css`
    font-size: 1.5rem;
    font-weight: bold;
  `,
  5: css`
    font-size: 1.25rem;
    font-weight: bold;
  `,
  6: css`
    font-size: 1rem;
    font-weight: bold;
  `,
};

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: ReactNode;
}

const StyledTitle = styled.h1<TitleProps>`
  margin: 0;
  ${(props) => headingStyles[props.level]}
`;

const Title: React.FC<TitleProps> = ({ level, children, ...rest }) => {
  return (
    <StyledTitle as={`h${level}`} level={level} {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
