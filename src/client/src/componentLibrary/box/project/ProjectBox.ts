import styled from "styled-components";
import { Color, FontSize, FontType } from "./../../../componentLibrary";

const ProjectBox = styled.div`
  width: 318px;
  height: 281px;
  margin: auto;
  border: 2px solid ${Color.DeepCyan};
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  font-family: ${FontType.Standard};
  font-weight: bold;
  font-size: ${FontSize.Header};
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
`;

export default ProjectBox;
