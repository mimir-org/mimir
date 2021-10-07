import styled from "styled-components";

const FullScreenButton = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: ${(props: { height: number }) => props.height}px !important;
  right: ${(props: { libraryOpen: boolean }) => (props.libraryOpen ? 344 : 60)}px !important;
  transition: right 0.2s ease-in-out, bottom 0.2s ease-in-out;
  z-index: 4;
`;

export default FullScreenButton;
