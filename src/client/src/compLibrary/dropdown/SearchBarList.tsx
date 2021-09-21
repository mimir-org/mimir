import styled from "styled-components";
import { Color } from "..";

const SearchBarList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: ${Color.White};
  font-size: 13px;
  position: absolute;
  top: 22px;
  left: 0px;
  z-index: 888888888;
  width: 100%;
`;

export default SearchBarList;
