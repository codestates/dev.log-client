import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class CustomList extends React.Component {
  constructor(props) {
    super();
    this.getCustomList = this.getCustomList.bind(this);
    this.state = {
      contentList: {},
    };
  }

  getCustomList() {
    const { userInfo, token } = this.props;
    axios
      .get(
        // `http://localhost:4000/custom/${this.props.selectedOption.toLowerCase()}/${
        //   userInfo.id
        // }`,
        `https://devyeon.com/custom/${this.props.selectedOption.toLowerCase()}/${
          userInfo.id
        }`
      )
      .then((result) => {
        if (Object.values(result).length !== 0) {
          this.setState({
            contentList: {
              ...result.data,
            },
          });
        }
      });
  }

  componentDidMount() {
    this.getCustomList();
    // console.log("Custom List, component did mount");
  }

  render() {
    const { selectedOption } = this.props;
    const { contentList } = this.state;
    // console.log(selectedOption);
    // console.log(contentList);

    return (
      <>
        <h3>{selectedOption} List</h3>
        {Object.values(contentList).length !== 0
          ? Object.values(contentList).map((ele) => (
              <div key={`customList${Object.values(contentList).indexOf(ele)}`}>
                <div>{ele["post.title"]}</div>
                <div>{ele["post.message"]}</div>
              </div>
            ))
          : ""}
      </>
    );
  }
}

export default withRouter(CustomList);
