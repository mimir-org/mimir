import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

const ProjectDescriptionBox = styled.div`
  box-sizing: border-box;
  min-width: 356px;
  min-height: 415px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${Color.Black};
  background-color: ${Color.White};
  border-radius: 5px;
  margin-top: 44px;
`;

export default ProjectDescriptionBox;
