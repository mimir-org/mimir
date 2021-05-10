import styled from "styled-components";
import { FontSize, FontType, FontWeight } from "../";

const SearchInput = styled.input`
  width: 294px;
  height: 36px;
  font-style: ${FontWeight.Italic};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.SubHeader};
  padding-left: 8px;
  margin: 0px 0px 10px 0px;
  border: 0;
  position: relative;
`;

export default SearchInput;
