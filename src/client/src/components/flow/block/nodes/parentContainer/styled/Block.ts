import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

interface Props {
  selected: boolean;
  width: number;
  height: number;
}

const Block = styled.div<Props>`
  position: relative;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  min-width: 500px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.GreyDark};
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);
`;

export default Block;
