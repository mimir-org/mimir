import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors";
import { Size } from "../../../../../../../compLibrary/size";
import { BlockNodeSize } from "../../../../../../../models/project";

interface Props {
  selected: boolean;
  size: BlockNodeSize;
}

const ParentBox = styled.div<Props>`
  position: relative;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  min-width: ${Size.BLOCK_PARENT_MIN_WIDTH}px;
  max-width: ${Size.BLOCK_PARENT_MAX_WIDTH}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.GREY_DARK};
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
`;

export default ParentBox;
