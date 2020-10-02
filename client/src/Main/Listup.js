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
      contentsList: [
        {
          id: "", //postId
          categoryId: "",
          username: "",
          title: "",
          message: "",
          view_count: "",
        },
      ],
      clickedContent: {
        id: "",
        categoryId: "",
        username: "",
        title: "",
        message: "",
      },
      newPost: false,
      editBtn: false,
      isMypage: false,
      customListOp: "scrap",
      //currentContent: {},
    };
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleGetDefault = this.handleGetDefault.bind(this);
    this.handleContentList = this.handleContentList.bind(this);
    this.handleClickedContent = this.handleClickedContent.bind(this);

    this.clickNewMessage = this.clickNewMessage.bind(this);
    this.clickEditBtn = this.clickEditBtn.bind(this);
    this.handleMypage = this.handleMypage.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
    this.handleSortList = this.handleSortList.bind(this);
  }
  //category state 끌어올리기
  handleInputCategory = (e) => {
    const list = ["전체보기", "Grapefruit", "Lime", "Coconut", "Mango"];
    this.setState({ category: e.target.innerHTML });
    this.setState({
      categoryId: list.indexOf(e.target.innerHTML),
    });
    this.handleContentList(this.state.categoryId);
    // console.log("카테고리~!!!");
  };

  //기본 contestList 불러오는 함수, category
  handleGetDefault = () => {
    // axios.get(`http://localhost:4000/posts/list`).then((res) => {
    axios.get(`https://devyeon.com/posts/list`).then((res) => {
      // console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };

  //필터링된 contentList 불러오는 함수
  handleContentList = (value) => {
    // axios.get(`http://localhost:4000/posts/category/${value}`).then((res) => {
    axios.get(`https://devyeon.com/posts/category/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };
  handleClickedContent = (data) => {
    this.setState({ clickedContent: data });
  };
  //새글 쓰기 리다이렉트
  clickNewMessage = () => {
    this.setState({ newPost: !this.state.newPost });
  };

  clickEditBtn = () => {
    this.setState({ editBtn: true });
  };

  // editDetail = (data) => {
  //   this.setState({
  //     contentsList: {
  //       username: data.username,
  //       title: data.title,
  //       message: data.message,
  //     },
  //   });
  // };

  //마이페이지 바꾸기
  handleMypage = () => {
    this.setState({ isMypage: !this.state.isMypage });
    console.log("마이페이지");
  };

  //검색된 contentList 불러오는 함수
  handleSearchList = (value) => {
    // axios.get(`http://localhost:4000/search/title/${value}`).then((res) => {
    axios.get(`https://devyeon.com/search/title/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };

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

  //시작하자마자 전체 데이터 뿌려주는 함수 -> 주기함수 써야 함.
  componentDidMount() {
    this.handleGetDefault();
  }

  render() {
    const {
      getUserData,
      handleLoginClick,
      isLogin,
      token,
      userInfo,
    } = this.props;
    // console.log("listup props", this.props);
    const {
      category,
      categoryId,
      clickedContent,
      contentsList,
      customListOp,
      editBtn,
      isMypage,
      newPost,
    } = this.state;

    const {
      handleInputCategory,
      handleGetDefault,
      handleContentList,
      handleClickedContent,
      clickNewMessage,
      clickEditBtn,
      handleMypage,
      handleSearchList,
      handleSortList,
    } = this;

    return (
      <div id="outer">
        {!isLogin ? <Redirect to="/login" /> : ""}
        {/* {isMypage ? <Redirect to="/mypage" /> : ""} */}
        {isMypage ? <Redirect to="/main/mypage" /> : <Redirect to="/main" />}
        <Nav
          isLogin={isLogin}
          token={token}
          isMypage={isMypage}
          userInfo={userInfo}
          handleMypage={handleMypage}
          handleLoginClick={handleLoginClick}
          getUserData={getUserData}
          handleSearchList={handleSearchList}
        />
        <div className="container" id="main">
          {newPost ? <Redirect to="/main/post" /> : ""}
          <Category
            token={token}
            categoryId={categoryId}
            category={category}
            handleInputCategory={handleInputCategory}
          />
          <Switch>
            <Route
              exact
              path="/main/post"
              render={() => (
                <Post
                  userInfo={userInfo}
                  token={token}
                  editBtn={editBtn}
                  clickEditBtn={clickEditBtn}
                />
              )}
            ></Route>
            <Route
              exact
              path="/main"
              render={() => (
                <Contents
                  // category={category} post에 카테고리가 필요한가?
                  token={token}
                  userInfo={userInfo}
                  contentsList={contentsList}
                  clickedContent={clickedContent}
                  newPost={newPost}
                  editBtn={editBtn}
                  handleClickedContent={handleClickedContent}
                  clickNewMessage={clickNewMessage}
                  handleSortList={handleSortList}
                />
              )}
            ></Route>
            <Route
              exact
              path="/main/detail"
              render={() => (
                <ContentDetail
                  token={token}
                  userInfo={userInfo}
                  categoryId={categoryId}
                  clickedContent={clickedContent}
                  handleClickedContent={handleClickedContent}
                  clickEditBtn={clickEditBtn}
                />
              )}
            ></Route>
            <Route
              exact
              path="/main/mypage"
              render={() => (
                <Mypage
                  isLogin={isLogin}
                  isMypage={isMypage}
                  userInfo={userInfo}
                  token={token}
                  handleMypage={handleMypage}
                />
              )}
            />
          </Switch>
          <Custom userInfo={userInfo} token={token} />
          {console.log("-----")}
        </div>
      </div>
    );
  }
}
export default Listup;
