import React from "react";
import Logo from "./Logo";
import User from "./User";
import Search from "./Search";
import styled from "styled-components";

export const Navbar = styled.nav`
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #02380e;
  padding: 30px 12px;
`;
const Nav = ({
  isLogin,
  token,
  isMypage,
  userInfo,
  handleMypage,
  handleLoginClick,
  getUserData,
  handleSearchList,
}) => (
  <Navbar id="nav">
    <Logo></Logo>
    <Search handleSearchList={handleSearchList}></Search>
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
