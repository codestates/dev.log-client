import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //input 마다 상태가 변경
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //로그인 함수
  handleLogin = () => {
    axios
      // .post("http://localhost:4000/users/login", this.state)
      .post("https://devyeon.com/users/login", this.state)
      .then((res) => {
        console.log(this.state);
        if (res.status === 200) {
          if (res.data.token) {
            this.props.getUserData(res.data);
            this.props.handleLoginClick();
          }
        }
      })
      .catch(() => alert("정보를 다시 확인해주세요"));
  };

  render() {
    return (
      <div className="container" id="login">
        {this.props.isLogin ? <Redirect to="/main" /> : ""}
        <img
          id="loginImg"
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODA3MDNfMTUy%2FMDAxNTMwNjA0NjkxNjYy.9hb0yxEe8attWVLyMOuKV4IcYIjlAoNH7t71Q1h3mNUg.m1L6H9rvWElrCXgXayG78ONe1FQ3msUJJl8q1Sea6qwg.JPEG.kingmold%2F%25B8%25BB%25C6%25BC%25C1%25EE_%25282%2529.jpg&type=sc960_832"
          alt="깜찍한 사진"
        />
        <h1>Log In</h1>
        <div>
          <input
            id="loginEmail"
            type="email"
            placeholder="이메일을 입력 해주세요"
            onChange={this.handleInputValue("email")}
          ></input>
        </div>
        <div>
          <input
            id="loginPw"
            type="password"
            placeholder="비밀번호를 입력 해주세요"
            onChange={this.handleInputValue("password")}
          ></input>
        </div>
        <button
          id="loginBtn"
          onClick={() => {
            this.handleLogin();
          }}
        >
          로그인
        </button>
        <div className="loginSocial">
          <button id="githubLoginBtn" type="submit" onClick={() => {}}>
            Git Hub
          </button>
          <button id="naverLoginBtn" type="submit" onClick={() => {}}>
            Naver
          </button>
        </div>
        <div>
          <button
            id="goToSignupBtn"
            onClick={() => {
              //클릭했을때 /signup으로 이동
              this.props.history.push("/signup");
              console.log("getdata", this.state);
            }}
          >
            signup
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
