import styled from "styled-components";
import { Color } from "../../colors/Color";
import { FontSize, FontWeight } from "../../font";
import { SearchIcon } from "../../../assets/icons/common";

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  font-style: ${FontWeight.ITALIC};
  font-size: ${FontSize.STANDARD};
  border: 1px solid ${Color.BLACK};
  border-radius: 5px;
  background-image: url(${SearchIcon});
  background-origin: content-box;
  background-position: right 6px;
  background-repeat: no-repeat;

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
  }

  &:focus {
    border-color: ${Color.BASTILLE};
  }
`;

export default SearchInput;
