import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
  <MainHeader>
    <NavLink to="/">
        {/* <img src="./images/logo.png" alt="loadding..." /> */}
        <img height={100} src="https://static.vecteezy.com/system/resources/thumbnails/024/824/478/small/e-commerce-logo-design-online-shop-logo-design-idea-vector.jpg" alt="loadding..." />
    </NavLink>
    <Nav />
  </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
`;

export default Header;
