import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize, FontWeight } from "../../font";

const SearchInput = styled.input`
  position: relative;
  width: 286px;
  height: 28px;
  font-style: ${FontWeight.Italic};
  font-size: ${FontSize.Standard};
  padding-left: 8px;
  margin: 0px 0px 5px 15px;
  border: 1px solid;
  border-color: ${Color.White};
  border-radius: 3px;

  &:hover {
    background-color: ${Color.BlueLight};
  }

  &:focus {
    border-color: ${Color.BlueMagenta};
  }
`;

export default SearchInput;
