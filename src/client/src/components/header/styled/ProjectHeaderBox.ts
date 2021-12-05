import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontWeight } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const ProjectHeaderBox = styled.div<Props>`
  position: relative;
  display: flex;
  top: 1px;
  margin-right: 75px;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && FontWeight.Bold};
  cursor: pointer;

  .toggle-icon {
    width: 8px;
    margin-left: 10px;
  }
`;

export default ProjectHeaderBox;
