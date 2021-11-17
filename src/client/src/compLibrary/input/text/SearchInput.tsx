import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize, FontWeight } from "../../font";

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  font-style: ${FontWeight.Italic};
  font-size: ${FontSize.Standard};
  padding-left: 8px;
  margin: 0px 0px 10px 15px;
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
