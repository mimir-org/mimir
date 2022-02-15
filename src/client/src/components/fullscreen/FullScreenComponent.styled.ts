import styled from "styled-components";

interface FullScreenButtonProps {
  height: number;
  libraryOpen: boolean;
}

export const FullScreenButton = styled.button<FullScreenButtonProps>`
  position: absolute;
  cursor: pointer;
  bottom: ${(props) => props.height + 16}px !important;
  right: ${(props) => (props.libraryOpen ? 348 : 63)}px !important;
  transition: right 0.2s ease-in-out, bottom 0.2s ease-in-out;
  background: transparent;
  padding: 0;
  line-height: 0;
  border: 0;
  z-index: 4;
`;
