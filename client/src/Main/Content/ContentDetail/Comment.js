import React from "react";
import CommentEntry from "./CommentEntry";
import axios from "axios";
axios.defaults.withCredentials = "include";

class Comment extends React.Component {
  constructor(props) {
    super();
    this.state = {
      commentValue: "",
    };
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleCommentPost = () => {
    axios
      .post("https://devyeon.com/comments/create", {
        userId: this.props.userInfo.id,
        postId: this.props.clickedContent.id,
        message: this.state.commentValue,
        email: this.props.userInfo.email,
      })
      .then((res) => {
        if (res.status === 200) {
          //
        }
      });
  };

  render() {
    const { comments } = this.props;
    return (
      <div className="commentArea">
        <div className="commentTop">
          <div className="commentCount">
            댓글: {this.props.clickedContent.commentCount}개
          </div>
          <input
            className="commentInput"
            type="commentValue"
            placeholder="댓글을 입력해주세요"
            onChange={this.handleInputValue("commentValue")}
          ></input>
          <button
            className="commentPostBtn"
            onClick={() => {
              this.handleCommentPost();
            }}
          >
            올리기
          </button>
        </div>
        <div className="commentBottom">
          {this.props.comments.map((comment) => (
            <CommentEntry
              comment={comment}
              key={`comment${comments.indexOf(comment)}`}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Comment;
