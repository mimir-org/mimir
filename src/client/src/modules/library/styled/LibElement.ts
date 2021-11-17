import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  active?: boolean;
}

const LibElement = styled.div<Props>`
  width: 286px;
  height: 36px;
  border: 1px solid;
  border-color: ${(props) => (props.active ? Color.Black : Color.DarkerGrey)};
  border-style: ${(props) => (props.active ? "dashed" : "default")};
  border-radius: 3px;
  background-color: ${Color.White};
  margin: 0px 0px 5px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${FontSize.SubHeader};
  padding-left: 10px;
  cursor: grab;

  .type-name {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-wrap: break-word;
  }
`;

export default LibElement;
