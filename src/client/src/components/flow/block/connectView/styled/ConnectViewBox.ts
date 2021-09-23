import styled from "styled-components";

/** Styled component that displays the button for showing the ConnectViewMenu. */
const ConnectViewBox = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  left: 96px;
  top: 30px;
  cursor: pointer;
`;

export default ConnectViewBox;
