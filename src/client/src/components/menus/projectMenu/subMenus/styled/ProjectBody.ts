import styled from "styled-components";
import { FontSize, FontWeight } from "../../../../../compLibrary/font";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  removeHeight?: boolean;
}

const ProjectBody = styled.div<Props>`
  padding: 0px 12px;
  height: ${(props) => (props.removeHeight ? "" : "100%")};
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
