import styled from "styled-components";
import Color from "../colors/Color";

const SearchBarListItem = styled.div`
  max-height: 16px;
  padding: 2px 0px 2px 4px;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: ${Color.Grey};
  background-color: ${Color.White};

  &:hover {
    background-color: ${Color.LightBlue};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default SearchBarListItem;
