import React from "react";
import Comment from "./Comment";
import axios from "axios";
import { withRouter } from "react-router-dom";
axios.defaults.withCredentials = "include";

class ContentDetail extends React.Component {
  constructor(props) {
    super();
    // this.deleteMessage = this.deleteMessage.bind(this);
    // this.editMessage = this.editMessage.bind(this);
  }

  // deleteMessage() {
  //   axios
  //     .post("https://devyeon.com/posts/delete", {
  //       id: this.props.clickedContent.id,
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         alert("삭제되었습니다.");
  //         this.props.history.push("/main");
  //       }
  //     });
  // }
  // editMessage() {
  //   this.props.history.push("/main/post");
  //   axios
  //     .get(`https://devyeon.com/posts/info/${this.props.clickedContent.id}`)
  //     .then((res) => {
  //       // await axios.get(`http://localhost:4000/posts/info/${this.props.contentsList.id}`).then((res) => {
  //       //main/post의 state가 바뀌어야함
  //       // this.props.clickEditBtn();
  //       // this.props.handleClickedContent();
  //       console.log(this.props.clickedContent);
  //     });
  // }

  render() {
    const {
      clickedContent,
      userInfo,
      comments,
      handleResetClickedContent,
    } = this.props;
    return (
      <div className="container" id="content">
        <div className="contentArea">
          <div className="contentHeader">
            <div className="contentUsername">
              작성자{this.props.clickedContent.username}
            </div>
            <div className="contentTitle">
              제목{this.props.clickedContent.title}
            </div>
          </div>
          <div
            className="contentMessage"
            dangerouslySetInnerHTML={{
              __html: this.props.clickedContent.message,
            }}
          ></div>
          <div className="contentBtns">
            <button
              className="contentDeleteBtn"
              onClick={() => {
                this.deleteMessage();
              }}
            >
              삭제하기
            </button>
            <button
              className="contentEditBtn"
              onClick={() => {
                this.editMessage();
              }}
            >
              수정하기
            </button>
          </div>
        </div>
        <Comment
          userInfo={userInfo}
          comments={comments}
          clickedContent={clickedContent}
        />
        <button
          className="backToListBtn"
          onClick={() => {
            handleResetClickedContent();
            this.props.history.push("/main");
          }}
        >
          목록으로
        </button>
      </div>
    );
  }
}

export default withRouter(ContentDetail);
