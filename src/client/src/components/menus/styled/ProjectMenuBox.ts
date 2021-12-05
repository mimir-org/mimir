import styled from "styled-components";
import { Size } from "../../../compLibrary/size";
import { Color } from "../../../compLibrary/colors";

const ProjectMenuBox = styled.div`
  position: absolute;
  top: ${Size.TopMenu_Height - 2}px;
  right: 265px;
  background: ${Color.White};
  height: auto;
  width: 250px;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
  border-width: 0px 1px 1px 1px;
  border-radius: 0px 0px 10px 10px;
  z-index: 6;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
`;

export default ProjectMenuBox;
