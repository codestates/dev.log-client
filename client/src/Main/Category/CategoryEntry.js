import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
class CategoryEntry extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const { handleInputCategory } = this.props;
    const list = ["전체보기", "Grapefruit", "Lime", "Coconut", "Mango"];
    return (
      <CategoryEntryStyle>
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
      </CategoryEntryStyle>
    );
  }
}
export default withRouter(CategoryEntry);

export const CategoryEntryStyle = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
