import styled from "styled-components";
import Color from "../colors/Color";

const SearchBarList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: ${Color.White};
  font-size: 13px;
  position: absolute;
  top: 22px;
  left: 0px;
  width: 100%;
`;

export default SearchBarList;
