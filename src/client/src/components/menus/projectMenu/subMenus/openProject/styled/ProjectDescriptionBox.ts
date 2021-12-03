import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

const ProjectDescriptionBox = styled.div`
  display: none; // Not required for version 1
  max-width: 418px;
  min-width: 353px;
  max-height: 415px;
  min-height: 402px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${Color.Black};
  border-radius: 5px;
  margin-top: 39.5px;
`;

export default ProjectDescriptionBox;
