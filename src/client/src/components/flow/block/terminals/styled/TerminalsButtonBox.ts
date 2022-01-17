import styled from "styled-components";

interface Props {
  visible: boolean;
}

const TerminalsButtonBox = styled.span<Props>`
  opacity: ${(props) => (!props.visible ? 0 : 1)};
  cursor: pointer;
  transition: opacity 250ms ease-in-out;
  pointer-events: all;
  z-index: 2;

  .menu-icon {
    pointer-events: none;
  }
`;

export default TerminalsButtonBox;
