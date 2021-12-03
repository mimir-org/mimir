import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../../../compLibrary/font";

const ProjectListLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${FontWeight.Normal};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  border-bottom: 2px solid ${Color.BlueMagenta};
  padding-right: 10px;

  p {
    white-space: nowrap;
    margin-bottom: 2px;
  }

  .name {
    width: 40%;
  }

  .owner {
    padding-left: 4px;
    width: 20%;
  }

  .version {
    text-align: center;
    width: 25%;
  }

  .edited {
    text-align: right;
    width: 15%;
  }
`;

export default ProjectListLabels;
