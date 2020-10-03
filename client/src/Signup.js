import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class Signup extends React.Component {
  constructor(props) {
    super();

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
    // this.signupWithGithub = this.signupWithGithub.bind(this);
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
    return value !== "" ? true : false; //작성되어 있으면 true
  };

  handleSignUp = () => {
    console.log(this.state.email);
    axios
      .post("https://devyeon.com/users/emailconfirm", {
        email: this.state.email,
      })
      .then((res) => {
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
    if (
      this.checkPassword(this.state.password) &&
      this.checkPassword2(this.state.password, this.state.password2) &&
      this.checkUsername(this.state.username)
    ) {
      //axios.post("http://localhost:4000/users/signup", this.state).then((res) => {
      axios
        .post("https://devyeon.com/users/signup", {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("회원가입이 완료되셨습니다");
            this.setState({ signup: true });
          }
        });
    }
    alert("모든 항목을 작성해주세요");
  };

  //소셜 로그인 회원가입 함수
  // signupWithGithub() {
  //
  // }

  render() {
    return (
      <div className="container" id="signup">
        {this.state.signup ? <Redirect to="/login" /> : ""}
        <center>
          <div className="inputContainer">
            <h1>Sign Up</h1>

            <div className="inputArea">
              Email
              <input
                id="inputEmail"
                type="email"
                placeholder="이메일을 입력 해주세요"
                onChange={this.handleInputValue("email")}
              ></input>
              <button
                id="checkSignupBtn"
                onClick={() => {
                  this.handleSignUp();
                }}
              >
                중복확인
              </button>
            </div>

            <div className="inputArea">
              이름
              <input
                id="inputUsername"
                type="username"
                placeholder="이름을 입력 해주세요"
                onChange={this.handleInputValue("username")}
              ></input>
              {this.checkUsername(this.state.username) ? (
                <span style={{ color: "green" }}>
                  <img src="tick.png" width="15em" alt="" />
                  확인
                </span>
              ) : (
                <span style={{ color: "red" }}>유저 이름을 입력해주세요</span>
              )}
            </div>

            <div className="inputArea">
              비밀번호
              <input
                className="inputPassword"
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue("password")}
              ></input>
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
              <input
                className="inputPassword"
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue("password2")}
              ></input>
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
            </div>
          </div>
          {/* inputArea 끝 */}

          <div className="signupArea">
            <button
              id="goToLoginBtn"
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              메인으로
            </button>
            <button
              id="submitSignupBtn"
              onClick={() => {
                this.postSignup();
              }}
            >
              회원가입
            </button>
          </div>

          <div className="signupSocialArea">
            <button
              id="submitGithuBtn"
              type="submit"
              onClick={() => {
                this.props.history.push("/login");
                // this.signupWithGithub();
              }}
            >
              Github
            </button>
            <button
              id="submitNaverBtn"
              type="submit"
              onClick={() => {
                this.props.history.push("/login");
                // this.signupWithGithub();
              }}
            >
              Naver
            </button>
          </div>
        </center>
      </div>
    );
  }
}
export default withRouter(Signup);
