import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  isOpen: boolean;
}

const ProjectBox = styled.div<Props>`
  position: absolute;
  display: flex;
  right: 382px;
  top: 3px;
  width: 290px;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && "bold"};
  cursor: pointer;

  .toggle-icon {
    position: relative;
    display: flex;
    width: 8px;
    left: 18px;
  }

  .project-name {
    position: relative;
    left: 10px;
    width: fit-content;
    max-width: 260px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-wrap: break-word;
  }
`;

export default ProjectBox;
