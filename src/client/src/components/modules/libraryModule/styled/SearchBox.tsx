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
  font-style: ${FontWeight.Italic};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.SubHeader};
  padding-left: 8px;
  margin-bottom: 10px;
  border: 0px solid ${Color.DarkerGrey};
`;

export default SearchBox;
