import styled from "styled-components";
import { FontSize } from "../../../../../../compLibrary/font";

const ProjectDescriptionBody = styled.div`
  padding: 0px 13px;

  .text-about {
    font-weight: normal;
    font-size: ${FontSize.Small};
  }

  .libraries,
  .sub-proj,
  .templates {
    display: none;
  }
`;

export default ProjectDescriptionBody;
