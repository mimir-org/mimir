import styled from "styled-components";
import { FontSize, FontWeight } from "../";

const SearchInput = styled.input`
  width: 287px;
  height: 36px;
  font-style: ${FontWeight.Italic};
  font-size: ${FontSize.SubHeader};
  padding-left: 8px;
  margin: 0px 0px 10px 15px;
  border: 0;
  position: relative;
`;

export default SearchInput;
