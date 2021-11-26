import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize } from "../../../../../compLibrary/font";
import { Size } from "../../../../../compLibrary/size";

interface Props {
  large?: boolean | false;
  visible: boolean;
}

const ProjectBox = styled.div<Props>`
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
  width: ${(props) => (props.large ? 630 : Size.MenuSmall_Width)}px;
  height: ${(props) => (props.large ? 500 : Size.MenuSmall_Height)}px;
  margin: auto;
  border: 2px solid ${Color.BlueMagenta};
  background-color: ${Color.White};
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-weight: bold;
  font-size: ${FontSize.Header};
  padding: 12px;
  visibility: ${(props) => !props.visible && "hidden"};
  z-index: 6;
`;

export default ProjectBox;
