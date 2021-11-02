import styled from "styled-components";

interface Props {
  removeHeight?: boolean;
}

const ProjectBody = styled.div<Props>`
  padding: 0px 12px;
  height: ${(props) => (props.removeHeight ? "" : "100%")};
  display: flex;
  flex-direction: column;
`;

export default ProjectBody;
