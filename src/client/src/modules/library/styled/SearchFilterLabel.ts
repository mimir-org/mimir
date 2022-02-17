import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const SearchFilterLabel = styled.span`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Medium};
  color: ${Color.Black};
  padding: 0px 5px 0px 2px;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default SearchFilterLabel;
