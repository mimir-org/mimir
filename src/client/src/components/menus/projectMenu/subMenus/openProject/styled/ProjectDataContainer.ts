import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

const ProjectDataContainer = styled.div`
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: 1px solid ${Color.BlueMagenta};
  box-shadow: 0 0, 0 -3px 3px -3px rgba(0, 0, 0, 0.2) inset, 0 0, 0 0;
`;

export default ProjectDataContainer;
