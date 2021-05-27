import styled from "styled-components";

const FullscreenIcon = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: 20px !important;
  left: 27px !important;
  /* bottom: ${(props) => (props.isBlockView ? "20px" : "130px")}!important;
  left: ${(props) => (props.isOpen ? "27px" : "22px")}!important; */
  z-index: 1200;
`;

export default FullscreenIcon;
