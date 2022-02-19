import styled from "styled-components";

interface Props {
  libOpen: boolean;
}

export const ModuleContent = styled.div<Props>`
  flex: 1;
  padding: 15px 5px 0 5px;
  opacity: ${(props) => (props.libOpen ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  overflow: auto;
`;
