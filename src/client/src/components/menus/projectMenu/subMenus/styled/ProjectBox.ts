import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize } from "../../../../../compLibrary/font";

interface Props {
  small?: boolean;
  visible?: boolean;
  height?: number;
  width?: number;
}

const ProjectBox = styled.div<Props>`
  box-sizing: border-box;
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
  width: ${(props) => (props.small ? 308 : props.width)}px;
  height: ${(props) => (props.small ? 281 : props.height)}px;
  max-width: 950px;
  max-height: 552px;
  margin: auto;
  border: 2px solid ${Color.BlueMagenta};
  background-color: ${Color.White};
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  font-weight: bold;
  font-size: ${FontSize.Header};
  padding: 20px;
  visibility: ${(props) => !props.visible && "hidden"};
  z-index: 6;
`;

export default ProjectBox;
