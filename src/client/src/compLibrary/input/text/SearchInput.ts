import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize, FontWeight } from "../../font";
import { SearchIcon } from "../../../assets/icons/common";

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  font-style: ${FontWeight.Italic};
  font-size: ${FontSize.Standard};
  border: 1px solid ${Color.BLACK};
  border-radius: 5px;
  background-image: url(${SearchIcon});
  background-origin: content-box;
  background-position: right 6px;
  background-repeat: no-repeat;

  &:hover {
    background-color: ${Color.BLUE_LIGHT};
  }

  &:focus {
    border-color: ${Color.BLUE_MAGENTA};
  }
`;

export default SearchInput;
