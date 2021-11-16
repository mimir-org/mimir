import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize, FontWeight } from "../../font";

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  font-style: ${FontWeight.Italic};
  font-size: ${FontSize.Standard};
  padding-left: 10px;
  margin: 0px -4px 8px 15px;
  border: 0;
  position: relative;

  &:hover {
    background-color: ${Color.LightBlue};
  }

  &:focus {
    border: 1px solid ${Color.Black};
  }
`;

export default SearchInput;
