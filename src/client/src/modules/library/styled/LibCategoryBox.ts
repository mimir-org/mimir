import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

const LibCategoryBox = styled.div`
  width: 286px;
  height: 30px;
  border: 1px solid ${Color.BlueMagenta};
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

  .expandIcon {
    position: relative;
    left: 3px;
  }
`;

export default LibCategoryBox;
