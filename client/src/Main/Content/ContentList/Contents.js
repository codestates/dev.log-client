import React from "react";
import { withRouter } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";

class Contents extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const {
      contentsList,
      handleClickedContent,
      clickedContent,
      handleSortList,
    } = this.props;

    return (
      <div className="container" id="middle">
        <div className="containerHead">
          <button
            id="newPostBtn"
            onClick={() => {
              this.props.clickNewMessage();
            }}
          >
            새글 쓰기
          </button>

          <select name="cars" id="cars" onChange={handleSortList}>
            <option value="id">최근 게시글</option>
            <option value="viewCount">조회수</option>
            <option value="commentCount">댓글수</option>
          </select>
        </div>

        <ContentsEntry
          contentsList={contentsList}
          clickedContent={clickedContent}
          handleClickedContent={handleClickedContent}
        />
      </div>
    );
  }
}

export default withRouter(Contents);
