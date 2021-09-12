import styled from "styled-components";

const FullScreenButton = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: ${(props) => (props.isInspectorOpen ? "305px" : "47px")} !important;
  right: ${(props) => (props.isLibraryOpen ? "344px" : "60px")} !important;
  transition: right 0.3s ease-in-out, bottom 0.3s ease-in-out;
  z-index: 4;
`;

export default FullScreenButton;
