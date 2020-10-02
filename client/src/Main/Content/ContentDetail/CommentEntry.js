import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { withRouter, useHistory } from "react-router-dom";

class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteComment = () => {
    axios
      .delete("https://devyeon.com/comments/delete", {
        token: this.props.token,
        id: this.props.id,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("삭제되었습니다.");
          this.props.history.push("/main/detail");
        }
      });
  };

  render() {
    return (
      <div className="commentList">
        <div className="commentUsername">{this.props.comment.username}</div>
        <div className="commentMessage">{this.props.comment.message}</div>
        <div className="commentBtns">
          <button className="commentEditBtn" onClick={() => {}}>
            수정
          </button>
          <button
            className="commentDeleteBtn"
            onClick={() => {
              this.deleteComment();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(CommentEntry);
