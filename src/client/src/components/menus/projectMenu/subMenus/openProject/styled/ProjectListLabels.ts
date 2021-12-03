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
    width: 34%;
  }

  .owner {
    width: 26%;
  }

  .version {
    text-align: center;
    width: 22%;
  }

  .edited {
    text-align: right;
    width: 18%;
  }
`;

export default ProjectListLabels;
