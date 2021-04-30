import styled from "styled-components";
import {
  Color,
  FontSize,
  FontType,
  FontWeight,
} from "../../../../componentLibrary";

const SearchBox = styled.input`
  width: 287px;
  height: 36px;
  border-color: ${Color.DarkerGrey};
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  font-style: ${FontWeight.Italic};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.SubHeader};
  padding-left: 8px;
  margin-bottom: 10px;
`;

export default SearchBox;
