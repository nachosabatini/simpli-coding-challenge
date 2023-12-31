import { ReactNode, HTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingStyles = {
  1: css`
    font-size: 2.5rem;
    margin-bottom: 20px;
    line-height: 3rem;
  `,
  2: css`
    font-size: 2rem;
    line-height: 2.5rem;
  `,
  3: css`
    font-size: 1.5rem;
    line-height: 1.5rem;
    color: #333;
  `,
  4: css`
    font-size: 1.25rem;
    line-height: 1.5rem;
  `,
  5: css`
    line-height: 1.55rem;
    font-size: 1.15rem;
  `,
  6: css`
    line-height: 1.55rem;
    font-size: 1rem;
  `,
};

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: ReactNode;
}

const StyledTitle = styled.h1<TitleProps>`
  margin: 0;
  font-weight: bold;
  ${(props) => headingStyles[props.level]}
`;

const Title: FC<TitleProps> = ({ level, children, ...rest }) => {
  return (
    <StyledTitle as={`h${level}`} level={level} {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
