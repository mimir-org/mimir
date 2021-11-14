import styled from "styled-components";
import { Color, FontSize } from "../../../../../compLibrary";

interface Props {
  small?: boolean;
  visible: boolean;
  height?: number;
  width?: number;
}

const ProjectBox = styled.div<Props>`
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
  width: ${(props) => (props.small ? 308 : props.width)}px;
  height: ${(props) => (props.small ? 281 : props.height)}px;
  max-width: 730px;
  max-height: 500px;
  margin: auto;
  border: 2px solid ${Color.BlueMagenta};
  background-color: ${Color.White};
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-weight: bold;
  font-size: ${FontSize.Header};
  padding: 20px;
  visibility: ${(props) => !props.visible && "hidden"};
  z-index: 6;
`;

export default ProjectBox;
