import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../../../compLibrary/font";

const ProjectListLabels = styled.div`
  display: flex;
  font-weight: ${FontWeight.Normal};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  border-bottom: 2px solid ${Color.BlueMagenta};
  height: auto;
  margin-bottom: -5px;

  .name {
    width: 270px;
    margin-bottom: 3px;
  }

  .owner {
    width: 210px;
  }

  .edited {
    width: 120px;
  }
`;

export default ProjectListLabels;
