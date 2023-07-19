import React from "react";
import styled from "styled-components";
import Link from "@/components/Link";

const FooterContainer = styled.footer`
  background-color: #3b047e;
  color: white;
  height: 200px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Column = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`;

const Content = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: lighter;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Column>
          <Title>About Us</Title>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            mollis nulla.
          </Content>
        </Column>
        <Column>
          <Title>Contact Us</Title>
          <Content>Email: info@example.com</Content>
          <Content>Address: 123 Fake Street, City, Country</Content>
        </Column>
        <Column>
          <Title>Links</Title>
          <LinkContainer>
            <Link href="#" underline color="white">
              Link 1
            </Link>
            <Link href="#" underline color="white">
              Link 2
            </Link>
            <Link href="#" underline color="white">
              Link 3
            </Link>
          </LinkContainer>
        </Column>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
