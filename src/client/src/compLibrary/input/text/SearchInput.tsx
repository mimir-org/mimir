import styled from "styled-components";
import FontSize from "../../font/FontSize";
import FontWeight from "../../font/FontWeight";
import Color from "../../colors/Color";

const SearchInput = styled.input`
  width: 287px;
  height: 30px;
  font-style: ${FontWeight.Italic};
  font-size: ${FontSize.Standard};
  padding-left: 8px;
  margin: 0px 0px 5px 15px;
  border: 0;
  position: relative;

  &:focus {
    border: 1px solid ${Color.Black};
  }

  &:hover {
    background-color: ${Color.LightBlue};
  }
`;

export default SearchInput;
