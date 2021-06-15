import styled from "styled-components";

const HandleBox = styled.div`
  .react-flow__handle-right {
    position: relative;
    background: url(${(props) => props.icon});
    visibility: ${(props) => (props.visible ? "visible" : "hidden")} !important;
    right: -100px;
  }
`;

export default HandleBox;
