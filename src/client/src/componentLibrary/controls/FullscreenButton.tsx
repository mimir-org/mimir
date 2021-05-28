import styled from "styled-components";

const FullscreenButton = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: ${(props) => (!props.isInspector ? "270px" : "50px")} !important;
  left: ${(props) => (props.isExplorer ? "350px" : "55px")} !important;
  transition: left 0.3s ease-in-out, bottom 0.3s ease-in-out;
  z-index: 4;
`;

export default FullscreenButton;
