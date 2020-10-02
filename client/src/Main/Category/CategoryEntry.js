import React from "react";
import { withRouter } from "react-router-dom";
class CategoryEntry extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const { handleInputCategory } = this.props;
    const list = ["전체보기", "Grapefruit", "Lime", "Coconut", "Mango"];
    return (
      <>
        {list.map((ele) => {
          return (
            <div
              className="categoryBox"
              onClick={handleInputCategory}
              key={`category${list.indexOf(ele)}`}
            >
              {ele}
            </div>
          );
        })}
      </>
    );
  }
}
export default withRouter(CategoryEntry);
