import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
}
#__next {
  min-height: 100%;
  position: relative;
}
`;

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
