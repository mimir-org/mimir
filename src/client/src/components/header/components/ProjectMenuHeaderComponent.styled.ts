import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontWeight } from "../../../compLibrary/font";

export const ProjectHeaderButtonContainer = styled.div`
  position: relative;
  height: 100%;
`;

interface ProjectHeaderButtonProps {
  isOpen: boolean;
}

export const ProjectHeaderButton = styled.button<ProjectHeaderButtonProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${Color.WHITE};
  font-weight: ${(props) => props.isOpen && FontWeight.BOLD};
`;
