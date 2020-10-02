import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

/// 실제 글 확인 페이지
class ContentsEntry extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isDetail: false,
    };
    this.getContentDetail = this.getContentDetail.bind(this);
  }

  getContentDetail = (content) => {
    axios
      .get(`https://devyeon.com/posts/info/${content.id}`) //이건되는데 왜 위에는 안될까
      .then((res) => {
        this.props.handleClickedContent(res.data);
      });
  };

  render() {
    const { contentsList } = this.props;
    return contentsList.map((content) => {
      return (
        <div
          className="contentBox"
          onClick={() => {
            this.getContentDetail(content);
            this.setState({ isDetail: !this.state.isDetail });
          }}
          key={`content${contentsList.indexOf(content)}`}
        >
          {this.state.isDetail ? <Redirect to="/main/detail" /> : ""}
          <div className="detailName">{content.username}</div>
          <div className="detailTitle">{content.title}</div>
          <div>
            <span className="detailComment">댓글{content.comment}</span>
            <span className="detailViewCount">조회수{content.view_count}</span>
          </div>
        </div>
      );
    });
    /* {
      {this.props.content.name.map((name) => {
          return <div className="name">{name}</div>;
        })}
    } */
  }
}

export default withRouter(ContentsEntry);
