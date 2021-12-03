import styled from "styled-components";

interface Props {
  hasProject: boolean;
}

const OpenButton = styled.div<Props>`
  opacity: ${(props) => (props.hasProject ? 1 : 0.5)};
`;

export default OpenButton;
