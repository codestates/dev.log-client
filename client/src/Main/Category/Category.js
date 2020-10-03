import React from "react";
import styled from "styled-components";
import CatgeoryEntry from "./CategoryEntry";

const Catgeory = ({ category, categoryId, handleInputCategory }) => (
  <CategoryStyle id="category">
    <CatgeoryEntry
      categoryId={categoryId}
      category={category}
      handleInputCategory={handleInputCategory}
    />
  </CategoryStyle>
);

export default Catgeory;
export const CategoryStyle = styled.div`
  grid-column: 1 / 2;
`;
