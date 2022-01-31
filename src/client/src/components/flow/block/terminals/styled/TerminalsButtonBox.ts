import styled from "styled-components";

interface Props {
  visible: boolean;
  isInput: boolean;
}

const TerminalsButtonBox = styled.span<Props>`
  opacity: ${(props) => (!props.visible ? 0 : 1)};
  cursor: pointer;
  transition: opacity 250ms ease-in-out;
  pointer-events: all;
  z-index: 2;

  .menu-icon {
    pointer-events: none;
    position: relative;
    left: ${(props) => (props.isInput ? -1 : 1)}px;
    right: ${(props) => (props.isInput ? 0 : 10)}px;
  }
`;

export default TerminalsButtonBox;
