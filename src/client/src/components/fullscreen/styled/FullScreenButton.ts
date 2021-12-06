import styled from "styled-components";

interface Props {
  height: number;
  libraryOpen: boolean;
}

const FullScreenButton = styled.div<Props>`
  position: absolute;
  cursor: pointer;
  bottom: ${(props) => props.height + 8}px !important;
  right: ${(props) => (props.libraryOpen ? 348 : 63)}px !important;
  transition: right 0.2s ease-in-out, bottom 0.2s ease-in-out;
  z-index: 4;
`;

export default FullScreenButton;
