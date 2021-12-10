import styled from "styled-components";

interface Props {
  width: number;
}

const ModuleContent = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
`;

export default ModuleContent;
