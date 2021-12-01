import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { BlockNodeSize } from "../../../../../../models/project";

interface Props {
  selected: boolean;
  size: BlockNodeSize;
}

const ParentBox = styled.div<Props>`
  position: relative;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  min-width: 500px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.GreyDark};
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);
`;

export default ParentBox;
