import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontWeight } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const ProjectHeaderButton = styled.button<Props>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 75px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && FontWeight.Bold};
`;

export default ProjectHeaderButton;
