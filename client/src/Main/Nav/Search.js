import React from "react";
import { withRouter } from "react-router-dom";
// axios.defaults.withCredentials = "include";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.inputEnter = this.inputEnter.bind(this);
  }
  //input 마다 상태가 변경
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //검색창에서 Enter시 검색어로 검색
  inputEnter = (handleSearchList, searchValue) => (e) => {
    if (e.charCode === 13) {
      handleSearchList(searchValue);
    }
  };

  render() {
    const { searchValue } = this.state;
    const { handleSearchList } = this.props;
    return (
      <div className="navSearch">
        <input
          type="text"
          className="searchValue"
          onChange={this.handleInputValue("searchValue")}
          onKeyPress={this.inputEnter(handleSearchList, searchValue)}
        />
        <input
          type="button"
          className="searchBtn"
          value="검색"
          onClick={() => {
            handleSearchList(searchValue);
          }}
        />
      </div>
    );
  }
}

export default withRouter(Search);
