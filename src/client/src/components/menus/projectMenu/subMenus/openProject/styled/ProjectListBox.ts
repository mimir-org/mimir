import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

const ProjectListBox = styled.div`
  position: relative;
  max-height: 350px;

  :before {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BlueMagenta};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    left: 1;
  }

  :after {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BlueMagenta};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export default ProjectListBox;
