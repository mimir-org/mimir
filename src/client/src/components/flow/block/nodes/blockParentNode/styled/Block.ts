import styled from "styled-components";
import { Color } from "../../../../../../compLibrary";

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
`;

export default Block;
