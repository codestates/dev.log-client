import React from "react";
import Logo from "./Logo";
import User from "./User";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #02380e;
  padding: 20px 12px;
`;
const Nav = ({
  isLogin,
  token,
  isMypage,
  userInfo,
  handleMypage,
  handleLoginClick,
  getUserData,
}) => (
  <Navbar id="nav">
    <Logo></Logo>
    <User
      isLogin={isLogin}
      token={token}
      isMypage={isMypage}
      userInfo={userInfo}
      handleMypage={handleMypage}
      handleLoginClick={handleLoginClick}
      getUserData={getUserData}
    ></User>
  </Navbar>
);

export default Nav;
