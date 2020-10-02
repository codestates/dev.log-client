import React from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
axios.defaults.withCredentials = "include";

class Post extends React.Component {
  constructor(props) {
    super(props);
    console.log("포스트", this.props);
    this.state = {
      categoryId: "",
      title: "",
      message: "",
      names: [],
      isPost: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }
  //   handleChange(e) {
  //     this.setState({ category: e.target.value });
  //   }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  //   axios.post('/user', {
  //     category: 'Fred',
  //     title: 'Flintstone'
  //     message:"",
  //     tag:[],
  //     clickEditBtn:false
  //   })
  handlePost = () => {
    console.log(this.state);
    axios
      .post(
        "https://devyeon.com/posts/create",
        {
          token: this.props.token,
          categoryId: this.state.categoryId,
          authorId: String(this.props.userInfo.id),
          message: this.state.message,
          title: this.state.title,
        },
        { headers: { "Access-Control-Allow-Origin": true } }
      )
      .then((res) => {
        if (res.status === 201) {
          //새글 쓰고 main으로 이동
          this.setState({ isPost: !this.state.isPost });
          //this.props.history.push("/main");
        }
      });
  };

  handleEdit = async () => {
    await this.handleInputValue("message");
    await axios
      // .put("http://localhost:4000/posts/update", {
      .put("https://devyeon.com/posts/update", {
        token: this.props.token,
        ...this.state,
      })
      .then((res) => {
        if (res.status === 200) {
          // this.props.handleGetDefault();
          alert("수정이 완료되었습니다");
          this.props.history.push("/main");
        }
      });
  };
  render() {
    //만약 새글쓰기를 클릭해서 들어왔을때는 취소,게시
    //수정하기 버튼을 클릭해서 들어왔을때는 취소,수정

    return (
      <div className="post">
        {this.state.isPost ? <Redirect to="/main" /> : ""}
        <center>
          <select
            className="post_tag"
            value={this.state.categoryId}
            onChange={this.handleInputValue("categoryId")}
          >
            <option></option>
            <option value="1">Grapefruit</option>
            <option value="2">Lime</option>
            <option value="3">Coconut</option>
            <option value="4">Mango</option>
          </select>

          <div>
            <textarea
              className="post_title"
              type="title"
              placeholder="title"
              onChange={this.handleInputValue("title")}
            ></textarea>
          </div>

          <div>
            <input
              className="post_content"
              type="message"
              placeholder="message"
              onChange={this.handleInputValue("message")}
            ></input>
            <input
              className="post_tag"
              type="tag"
              placeholder="태그를 입력해주세요(최대3개)"
              onChange={this.handleInputValue("tag")}
            ></input>
          </div>
          <button
            className="post_btnDelete"
            type="submit"
            onClick={() => {
              //클릭했을때 /main으로 이동
              this.props.clickNewMessage();
              this.props.history.push("/main");
            }}
          >
            취소
          </button>
          {this.props.editBtn ? (
            <button
              className="post_btnEdit"
              type="submit"
              onClick={() => {
                //클릭했을때 post요청 후 main으로 이동
                this.handleEdit();
                console.log(this.props);
              }}
            >
              수정
            </button>
          ) : (
            <button
              className="post_btnPost"
              type="submit"
              onClick={() => {
                //클릭했을때 post요청 후 main으로 이동
                this.handlePost();
              }}
            >
              게시
            </button>
          )}
        </center>
      </div>
    );
  }
}

export default withRouter(Post);
