import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

const ProjectListLabels = styled.div`
  display: flex;
  font-weight: normal;
  font-size: 14px;
  color: ${Color.Black};
  margin: -10px 0px 0px 0px;
  border-bottom: 1px solid ${Color.BlueMagenta};
  height: auto;

  p {
    margin: 0px;
  }

  .name {
    width: 45%;
  }

  .owner {
    width: 35%;
    margin-left: 10px;
  }

  .edited {
    width: 15%;
    margin-left: 10px;
  }
`;

export default ProjectListLabels;
