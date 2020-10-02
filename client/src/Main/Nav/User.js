import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const UserBtn = styled.button`
  background: #02380e;
  color: #fff;
  border: none;
  width: 100px;
  height: 10px;
  font-size: 1em;
  margin-right: 5px;
`;

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMypage: false,
    };
  }

  render() {
    const {
      token,
      userInfo,
      handleMypage,
      getUserData,
      handleLoginClick,
    } = this.props;

    return (
      <div className="userArea">
        {/* {!isLogin ? <Redirect to="/login" /> : ""} */}

        <UserBtn
          id="logoutBtn"
          onClick={() => {
            console.log("클랙 props", this.props.userInfo);
            axios
              .post("https://devyeon.com/users/logout", {
                token: token,
              })
              .then((result) => {
                getUserData(result);
                handleLoginClick(); //로그아웃 되었을 때 토큰 없애기
              })
              .catch((error) => console.log(error));
          }}
        >
          로그아웃
        </UserBtn>

        <UserBtn
          id="mypageBtn"
          onClick={() => {
            console.log("user에서 userInfo", userInfo);
            axios
              // .post("http://localhost:4000/users/info", {
              //   token: token,
              // }) //마이페이지로 리다이렉트
              .post("https://devyeon.com/users/info", {
                token: token,
              }) //마이페이지로 리다이렉트
              .then((res) => {
                handleMypage();
              });
          }}
        >
          마이페이지
          {/* <Link to='/mypage'> */}
        </UserBtn>
      </div>
    );
  }
}

export default withRouter(User);
