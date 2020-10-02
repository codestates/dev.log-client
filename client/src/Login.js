import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const InputContainer = styled.div`
  width: 600px;
  height: 700px;
  mairgin: 0 auto;
  margin-top: 10vh;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
`;

const InputLogin = styled.input`
  width: 300px;
  height: 30px;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 10px;
`;

const LoginBtn = styled.button`
background:#F1C40F;
color:#fff;
border:none;
width: 200px;
height:30px;
font-size:1em;
margin-bottom:10px;
border-radius: 10px;
box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
}

`;
const GithubBtn = styled.button`
  background: #000000;
  color: #fff;
  border: none;
  width: 80px;
  height: 35px;
  font-size: 0.8em;
  margin-bottom: 10px;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`;
const NaverBtn = styled.button`
  background: #15b439;
  color: #fff;
  border: none;
  width: 80px;
  height: 35px;
  font-size: 0.8em;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`;
const SignupBtn = styled.button`
  background: #fff;
  color: #000000;
  border: none;
  width: 80px;
  height: 25px;
  font-size: 1em;
  text-shadow: 2px 2px #c8c8c8;
`;
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
      .post("http://localhost:4000/users/login", this.state)
      // .post("https://devyeon.com/users/login", this.state)
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
        <center>
          <InputContainer>
            <img
              id="loginImg"
              src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODA3MDNfMTUy%2FMDAxNTMwNjA0NjkxNjYy.9hb0yxEe8attWVLyMOuKV4IcYIjlAoNH7t71Q1h3mNUg.m1L6H9rvWElrCXgXayG78ONe1FQ3msUJJl8q1Sea6qwg.JPEG.kingmold%2F%25B8%25BB%25C6%25BC%25C1%25EE_%25282%2529.jpg&type=sc960_832"
              alt="깜찍한 사진"
            />
            <h1>Log In</h1>
            <div>
              <InputLogin
                id="loginEmail"
                type="email"
                placeholder="이메일을 입력 해주세요"
                onChange={this.handleInputValue("email")}
              ></InputLogin>
            </div>
            <div>
              <InputLogin
                id="loginPw"
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue("password")}
              ></InputLogin>
            </div>
            <LoginBtn
              id="loginBtn"
              onClick={() => {
                this.handleLogin();
              }}
            >
              로그인
            </LoginBtn>
            <div className="loginSocial">
              <GithubBtn id="githubLoginBtn" type="submit" onClick={() => {}}>
                Git Hub
              </GithubBtn>
              <NaverBtn id="naverLoginBtn" type="submit" onClick={() => {}}>
                Naver
              </NaverBtn>
            </div>
            <div>
              <SignupBtn
                id="goToSignupBtn"
                onClick={() => {
                  //클릭했을때 /signup으로 이동
                  this.props.history.push("/signup");
                  console.log("getdata", this.state);
                }}
              >
                signup
              </SignupBtn>
            </div>
          </InputContainer>
        </center>
      </div>
    );
  }
}
export default withRouter(Login);
