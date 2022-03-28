import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";

interface Props {
  selected: boolean;
  width: number;
  height: number;
}

const ParentBox = styled.div<Props>`
  position: relative;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.LIGHT_SILVER};
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);
`;

export default ParentBox;
