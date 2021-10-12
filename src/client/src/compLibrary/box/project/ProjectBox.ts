import styled from "styled-components";
import { Color, FontSize } from "./../../../compLibrary";

interface Props {
  small?: boolean;
  visible: boolean;
  height?: number;
  width?: number;
}

const ProjectBox = styled.div<Props>`
  width: ${(props) => (props.small ? "308px" : "auto")};
  width: ${(props) => (props.small ? "308px" : props.width ? props.width + "px" : "auto")};
  height: ${(props) => (props.small ? "281px" : "auto")};
  height: ${(props) => (props.small ? "281px" : props.height ? props.height + "px" : "auto")};
  max-width: 502px;
  max-height: 463px;
  margin: auto;
  border: 2px solid ${Color.BlueMagenta};
  background-color: ${Color.White};
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  font-weight: bold;
  font-size: ${FontSize.Header};
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
  padding: 20px;
  visibility: ${(props) => !props.visible && "hidden"};
  z-index: 5;
`;

export default ProjectBox;
