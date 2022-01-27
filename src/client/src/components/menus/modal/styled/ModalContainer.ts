import styled from "styled-components";

interface ModalProps {
  top?: string;
}

const ModalContainer = styled.div<ModalProps>`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: ${(props) => (props.top ? props.top : 0)};
  margin: auto;
  width: fit-content;
  height: fit-content;
  z-index: 6;
`;

export default ModalContainer;
