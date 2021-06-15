import styled from "styled-components";
import Size from "../size/Size";

const HandleBox = styled.div`
  .react-flow__handle-right {
    position: relative;
    background: url(${(props) => props.icon});
    visibility: ${(props) => (props.visible ? "visible" : "hidden")} !important;
    top: -80px;
    right: -${Size.Node_Width}px;
    margin-bottom: 3px;
  }

  .react-flow__handle-left {
    position: relative;
    background: url(${(props) => props.icon});
    visibility: ${(props) => (props.visible ? "visible" : "hidden")} !important;
    top: -35px;
    margin-bottom: 3px;
  }
`;

export default HandleBox;
