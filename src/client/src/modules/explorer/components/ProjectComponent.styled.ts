import styled from "styled-components";

interface ProjectContentContainerProps {
  width: number;
}

export const ProjectContentContainer = styled.div<ProjectContentContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
`;
