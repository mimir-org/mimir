import styled from "styled-components";

const FullscreenIcon = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: ${(props) => (props.isOpen ? "130px" : "125px")};
  left: ${(props) => (props.isOpen ? "27px" : "22px")};
  z-index: 1200;
`;

export default FullscreenIcon;
