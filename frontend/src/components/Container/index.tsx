import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Container = ({ children }: PropsWithChildren) => {
  return (
    <ContainerWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </ContainerWrapper>
  );
};

export default Container;
