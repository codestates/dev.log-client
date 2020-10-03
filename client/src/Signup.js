import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = "include";

const InputContainer = styled.div`
  width: 600px;
  height: 700px;
  mairgin: 0 auto;
  margin-top: 10vh;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
`;

const InputArea = styled.div`
  //정렬 필요
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  letter-spacing: 1px;
  text-align: center;
  margin: 0px 10px 10px;
`;
const CheckSignupBtn = styled.button`
  color: white;
  width: 107px;
  height: 38px;
  background: #02380e;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 5px;
`;
const SubmitGithubBtn = styled.button`
  color: #fff;
  border: none;
  width: 80px;
  height: 35px;
  background: #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 5px;
`;
const SubmitNaverBtn = styled.button`
  width: 80px;
  height: 35px;
  font-size: 0.8em;
  background: #15b439;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 5px;
`;
const Button = styled.button`
  width: 124px;
  height: 35px;
  background: #f1c40f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 50px 5px 10px;
`;

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      signup: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkPassword2 = this.checkPassword2.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.postSignup = this.postSignup.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  //input 작성 내용을 state로 변경
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //pw 체크
  checkPassword = (value) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/; //  6 ~ 12자 영문, 숫자 조합
    return regExp.test(value); // 형식에 맞는 경우 true 리턴
  };

  //pw2 체크
  checkPassword2 = (value1, value2) => {
    return value1 === value2 && value2 !== "" ? true : false; // 형식에 맞는 경우 true 리턴
  };

  //유저이름 적었는지 체크
  checkUsername = (value) => {
    let result = value !== "" ? true : false; //작성되어 있으면 true
    return result;
  };

  handleSignUp = () => {
    axios
      //.post("http://localhost:4000/users/emailconfirm", this.state.email)
      .post("https://devyeon.com/users/emailconfirm", this.state.email)
      .then((res) => {
        console.log("signup:res", res);
        if (res.status === 200) {
          alert("사용가능한 아이디입니다");
        }
      })
      .catch((err, res) => {
        alert("이미 아이디가 있습니다");
        console.log(err);
      });
  };

  postSignup = () => {
    if (this.checkPassword() && this.checkPassword2() && this.checkUsername()) {
      //axios.post("http://localhost:4000/users/signup", this.state).then((res) => {
      axios.post("https://devyeon.com/users/signup", this.state).then((res) => {
        if (res.status === 201) {
          alert("회원가입이 완료되셨습니다");
          this.setState({ signup: true });
        }
      });
    }
    alert("모든 항목을 확인해주세요");
  };

  //소셜 로그인 회원가입 함수
  signupWithGithub = () => {};

  render() {
    return (
      <div className="container" id="signup">
        {this.state.signup ? <Redirect to="/login" /> : ""}
        <center>
          <InputContainer>
            <img src="dev-log.png" style={{ width: "200px", margin: "20px" }} />
            <h1>Sign Up</h1>

            <InputArea>
              Email
              <Input
                id="inputEmail"
                type="email"
                placeholder="이메일을 입력 해주세요"
                onChange={this.handleInputValue("email")}
              ></Input>
              <CheckSignupBtn
                onClick={() => {
                  this.handleSignUp();
                }}
              >
                중복확인
              </CheckSignupBtn>
            </InputArea>

            <InputArea>
              이름
              <Input
                id="inputUsername"
                type="username"
                placeholder="이름을 입력 해주세요"
                onChange={this.handleInputValue("username")}
              ></Input>
              {this.checkUsername(this.state.username) ? (
                <span style={{ color: "green" }}>
                  <img src="tick.png" width="15em" alt="" />
                  확인
                </span>
              ) : (
                <span style={{ color: "red" }}>유저 이름을 입력해주세요</span>
              )}
            </InputArea>

            <InputArea>
              비밀번호
              <Input
                className="inputPassword"
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue("password")}
              ></Input>
              {this.checkPassword(this.state.password) ? (
                <span style={{ color: "green" }}>
                  <img src="tick.png" width="15em" alt="" />
                  확인
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  영문,숫자 조합 6-12글자 입력
                </span>
              )}
              <br />
              비밀번호 확인
              <Input
                className="inputPassword"
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue("password2")}
              ></Input>
              {this.checkPassword2(
                this.state.password,
                this.state.password2
              ) ? (
                <span style={{ color: "green" }}>
                  <img src="tick.png" width="15em" alt="" />
                  확인
                </span>
              ) : (
                <span style={{ color: "red" }}>동일한 비밀번호가 아닙니다</span>
              )}
            </InputArea>

            <div className="signupArea">
              <Button
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                메인으로
              </Button>
              <Button
                onClick={() => {
                  this.postSignup();
                }}
              >
                회원가입
              </Button>
            </div>

            <div className="signupSocialArea">
              <SubmitGithubBtn type="submit" onClick={() => {}}>
                Github
              </SubmitGithubBtn>
              <SubmitNaverBtn type="submit" onClick={() => {}}>
                Naver
              </SubmitNaverBtn>
            </div>
          </InputContainer>
        </center>
      </div>
    );
  }
}
export default withRouter(Signup);
