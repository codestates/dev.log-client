import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import Mypage from "./Mypage";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = "include";

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    font-family: "Nanum Pen Script", cursive;
  }

`;
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogin: false,
      token: "",
      userInfo: {
        userId: "",
        username: "",
      },
      isMypage: false,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.handleMypage = this.handleMypage.bind(this);
  }
  //로그인 시 userInfo를 끌어올리는 함수
  getUserData = (data) => {
    this.setState({
      token: data.token,
      userInfo: {
        ...data.userData,
      },
    });
  };
  //클릭하면 isLogin 번경
  handleLoginClick = () => {
    setTimeout(() => {
      this.setState({ isLogin: !this.state.isLogin });
    }, 500);
  };
  //마이페이지 바꾸기
  handleMypage = () => {
    this.setState({ isMypage: !this.state.isMypage });
    console.log("마이페이지");
  };
  render() {
    const { isLogin, token, userInfo, isMypage } = this.state;
    return (
      <>
        <GlobalStyle />
        <Switch>
          {console.log("RENDERED app.js")}
          {isLogin ? (
            <Route
              path="/main"
              render={() => (
                <Listup
                  isLogin={isLogin}
                  userInfo={userInfo}
                  token={token}
                  isMypage={isMypage}
                  getUserData={this.getUserData}
                  handleLoginClick={this.handleLoginClick}
                  handleMypage={this.handleMypage}
                />
              )}
            />
          ) : (
            ""
          )}
          <Route
            path="/mypage"
            render={() => {
              return isMypage ? (
                <Mypage
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  isMypage={isMypage}
                  handleMypage={this.handleMypage}
                />
              ) : (
                <Listup
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  getUserData={this.getUserData}
                  handleLoginClick={this.handleLoginClick}
                />
              );
            }}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                isLogin={isLogin}
                token={token}
                userInfo={userInfo}
                getUserData={this.getUserData}
                handleLoginClick={this.handleLoginClick}
              />
            )}
          />
          <Route path="/signup" render={() => <Signup />} />
          <Route
            path="/"
            render={() => {
              if (!isLogin) return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </>
    );
  }
}
export default App;
