import styled from "styled-components";

interface Props {
  visible: boolean;
  left: string;
  right: string;
}

const TerminalsButtonBox = styled.div<Props>`
  opacity: ${(props) => (!props.visible ? 0 : 1)};
  position: absolute;
  top: 6px;
  cursor: pointer;
  transition: opacity 250ms ease-in-out;
  pointer-events: all;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  z-index: 6;

  .menu-icon {
    pointer-events: none;
  }
`;

export default TerminalsButtonBox;
