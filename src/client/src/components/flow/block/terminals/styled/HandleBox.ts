import styled from "styled-components";

/** Styled component for the terminals displayed on a node */
const HandleBox = styled.div`
  .react-flow__handle-block {
    position: absolute;
    visibility: ${(props: { visible: boolean }) => (props.visible ? "visible" : "hidden")} !important;
    top: ${(props: { top: string }) => props.top};
    left: ${(props: { left: string }) => props.left};
  }
`;

export default HandleBox;
