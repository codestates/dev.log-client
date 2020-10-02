import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import Mypage from "../Mypage";
import Custom from "../Main/Custom/Custom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class Listup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      categoryId: 0,
      category: "전체보기",
      contentsList: [],
      clickedContent: {},
      comments: [],

      newPost: false,
      editBtn: false,
      customListOp: "scrap",
      // 다시 목록으로 갔을 때 reset 설정
      // post 전송 후 리스트 리프래시
    };

    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleContentList = this.handleContentList.bind(this);
    this.handleClickedContent = this.handleClickedContent.bind(this);
    this.handleResetClickedContent = this.handleResetClickedContent.bind(this);

    this.clickNewMessage = this.clickNewMessage.bind(this);
    this.clickEditBtn = this.clickEditBtn.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
    this.handleSortList = this.handleSortList.bind(this);
  }

  // category 관련 (1) 전체 글 (2) 카테고리 필터링
  componentDidMount() {
    this.handleContentList(this.state.categoryId);
    console.log(this.state.clickedContent);
  }
  handleInputCategory(e) {
    const list = ["전체보기", "Grapefruit", "Lime", "Coconut", "Mango"];
    this.setState({ category: e.target.innerHTML });
    this.setState(
      {
        categoryId: list.indexOf(e.target.innerHTML),
      },
      () => this.handleContentList(this.state.categoryId)
    );
  }
  handleContentList(value) {
    console.log(value);
    value !== 0
      ? axios.get(`https://devyeon.com/posts/category/${value}`).then((res) => {
          console.log(res.data);
          this.setState({ contentsList: res.data });
        })
      : axios.get(`https://devyeon.com/posts/list`).then((res) => {
          this.setState({ contentsList: res.data });
          console.log(res.data);
        });
  }

  // 선택한 content 정보 -> 메인에 뿌릴 정보 모두
  handleClickedContent(data) {
    this.setState({ clickedContent: data }, () => {
      axios
        .get(
          `https://devyeon.com/comments/list/${this.state.clickedContent.id}`
        )
        .then((res) => {
          this.setState({ comments: [...res.data] });
        });
    });
  }

  handleResetClickedContent() {
    this.setState({ clickedContent: {} });
    this.setState({ comments: [] });
  }

  //새글 쓰기 리다이렉트
  clickNewMessage() {
    this.setState({ newPost: !this.state.newPost });
  }

  clickEditBtn() {
    this.setState({ editBtn: !this.state.editBtn });
  }

  //검색된 contentList 불러오는 함수
  handleSearchList(value) {
    axios.get(`https://devyeon.com/search/title/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  }

  //선택된 정렬 기준으로 contentList 불러오는 함수
  handleSortList = (e) => {
    // axios.get(`http://localhost:4000/posts/sort/${e.target.value}`)
    // .then((res) => {
    axios
      .get(`https://devyeon.com/posts/sort/${e.target.value}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ contentsList: res.data });
      });
  };

  render() {
    const { isLogin, isMypage, token, userInfo, handleMypage } = this.props;

    const {
      category,
      categoryId,
      clickedContent,
      comments,
      contentsList,
      customListOp,
      editBtn,
      newPost,
    } = this.state;

    const {
      handleInputCategory,
      handleContentList,
      handleClickedContent,
      handleResetClickedContent,
      clickNewMessage,
      clickEditBtn,
      handleSearchList,
      handleSortList,
    } = this;

    return (
      <div id="outer">
        {console.log(this.state.clickedContent, this.state.comments)}
        {isMypage ? (
          <Switch>
            {console.log("route is mypage")}
            <Redirect to="/mypage" render={() => <Mypage />} />
          </Switch>
        ) : (
          <Redirect to="/main" />
        )}
        <Nav
          isLogin={isLogin}
          token={token}
          userInfo={userInfo}
          isMypage={isMypage}
          handleSearchList={handleSearchList}
          handleMypage={handleMypage}
        />

        <div className="container" id="main">
          {newPost ? <Redirect to="/main/post" /> : ""}

          <Category
            isLogin={isLogin}
            token={token}
            userInfo={userInfo}
            categoryId={categoryId}
            category={category}
            handleInputCategory={handleInputCategory}
          />
          <Switch>
            <Route
              exact
              path="/main"
              render={() => (
                <Contents
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  clickedContent={clickedContent}
                  comments={comments}
                  contentsList={contentsList}
                  editBtn={editBtn}
                  newPost={newPost}
                  handleContentList={handleContentList}
                  handleClickedContent={handleClickedContent}
                  handleResetClickedContent={handleResetClickedContent}
                  clickNewMessage={clickNewMessage}
                  clickEditBtn={clickEditBtn}
                  handleSortList={handleSortList}
                  handleSearchList={handleSearchList}
                />
              )}
            ></Route>

            <Route
              exact
              path="/main/detail"
              render={() => (
                <ContentDetail
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  clickedContent={clickedContent}
                  comments={comments}
                  contentsList={contentsList}
                  editBtn={editBtn}
                  newPost={newPost}
                  handleResetClickedContent={handleResetClickedContent}
                  clickNewMessage={clickNewMessage}
                  clickEditBtn={clickEditBtn}
                  handleSearchList={handleSearchList}
                />
              )}
            ></Route>
            <Route
              exact
              path="/main/post"
              render={() => (
                <Post
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  clickNewMessage={clickNewMessage}
                />
              )}
            ></Route>
          </Switch>

          <Custom
            token={token}
            userInfo={userInfo}
            customListOp={customListOp}
          />
        </div>
      </div>
    );
  }
}
export default Listup;
