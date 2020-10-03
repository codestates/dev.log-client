import React from "react";
import CustomList from "./CustomList";
import styled from "styled-components";

export const CustomStyle = styled.div`
  grid-column: 3 / 4;
`;

class Custom extends React.Component {
  constructor(props) {
    super();
    this.handleRadio = this.handleRadio.bind(this);
    this.state = {
      radioGroup: {
        Scrap: true,
        Posts: false,
        Tagged: false,
      },
      selectedOption: "Scrap",
    };
  }

  handleRadio(event) {
    let obj = {};
    Object.keys(this.state.radioGroup).map((ele) => {
      return (obj[ele] = false);
    });
    obj[event.target.value] = true;
    this.setState({
      radioGroup: {
        ...obj,
      },
    });

    this.setState({
      selectedOption: event.target.value,
    });
  }

  render() {
    const { selectedOption } = this.state;
    const { token, userInfo } = this.props;
    const list = Object.keys(this.state.radioGroup);
    return (
      <CustomStyle id="custom">
        <form>
          <div>Custom List</div>
          {list.map((ele) => {
            return (
              <label key={`label${list.indexOf(ele)}`}>
                <input
                  key={`input${list.indexOf(ele)}`}
                  type="radio"
                  name="radioGroup"
                  value={ele}
                  checked={this.state.radioGroup[ele]}
                  onChange={this.handleRadio}
                />
              </label>
            );
          })}
        </form>
        <CustomList
          selectedOption={selectedOption}
          token={token}
          userInfo={userInfo}
        />
      </CustomStyle>
    );
  }
}

export default Custom;
