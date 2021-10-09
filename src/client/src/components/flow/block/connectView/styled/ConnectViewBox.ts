import styled from "styled-components";

/** Styled component that displays the button for showing the ConnectViewMenu. */
const ConnectViewBox = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  position: absolute;
  left: 8px;
  bottom: -5px;
  cursor: pointer;
`;

export default ConnectViewBox;
