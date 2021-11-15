import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

interface Props {
  selected: boolean;
  width: number;
  height: number;
}

const Block = styled.div<Props>`
  position: absolute;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.DarkGrey};
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);
  z-index: 1 !important;
`;

export default Block;
