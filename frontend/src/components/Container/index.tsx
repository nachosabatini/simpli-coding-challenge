import { PropsWithChildren } from "react";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: 40px;
  height: 100%;
`;

const Container = ({ children }: PropsWithChildren) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
