import styled from "styled-components";
import { Color, FontSize } from "../../";

const LibraryCategory = styled.div`
  width: 294px;
  height: 41px;
  border: 2px solid ${Color.Black};
  border-radius: 3px;
  background-color: ${Color.White};
  margin: 5px 0px 5px 0px;
  display: inline-flex;
  align-items: center;
  font-size: ${FontSize.SubHeader};
  padding-left: 10px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export default LibraryCategory;
