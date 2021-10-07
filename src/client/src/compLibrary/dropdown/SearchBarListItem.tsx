import styled from "styled-components";
import Color from "../colors/Color";

const SearchBarListItem = styled.div`
  height: 18px;
  border-bottom: 1px solid ${Color.DarkGrey};
  background-color: ${Color.White};

  p {
    padding: 3px 13px;
  }

  &:hover {
    background-color: ${Color.LightBlue};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default SearchBarListItem;
