import styled from "styled-components";

const FullScreenButton = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: ${(props) => (props.inspectorOpen ? 305 : 47)}px !important;
  right: ${(props) => (props.libraryOpen ? 344 : 60)}px !important;
  transition: right 0.3s ease-in-out, bottom 0.3s ease-in-out;
  z-index: 4;
`;

export default FullScreenButton;
