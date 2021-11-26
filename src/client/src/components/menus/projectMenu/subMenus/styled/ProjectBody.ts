import styled from "styled-components";
import { FontSize, FontWeight } from "../../../../../compLibrary/font";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  large?: boolean | false;
}

const ProjectBody = styled.div<Props>`
  padding: 0px 12px;
  height: ${(props) => (props.large ? "450px" : "auto")};
  min-height: 140px;
  display: flex;
  flex-direction: column;

  .subheader {
    font-weight: ${FontWeight.Bold};
    font-size: ${FontSize.SubHeader};
    color: ${Color.BlueMagenta};
    margin: 14px 0px;
  }
`;

export default ProjectBody;
