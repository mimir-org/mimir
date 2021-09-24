import styled from "styled-components";

/** Styled component that displays the button for showing the ConnectViewMenu. */
const ConnectViewBox = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  right: -1px;
  top: 30px;
  cursor: pointer;
`;

export default ConnectViewBox;
