import styled from "styled-components";

interface Props {
  libOpen: boolean;
}

const ModuleBody = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 90%;
  padding: 0 5px;
  opacity: ${(props) => (props.libOpen ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  overflow-y: hidden;
`;

export default ModuleBody;
