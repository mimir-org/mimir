import styled from "styled-components";
import { Color } from "../../../compLibrary";
import { FontSize } from "../../../compLibrary/font";

const LibCategory = styled.div`
  width: 284px;
  height: 35px;
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

export default LibCategory;
