import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

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

        <button
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
        </button>

        <button
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
        </button>
      </div>
    );
  }
}

export default withRouter(User);
