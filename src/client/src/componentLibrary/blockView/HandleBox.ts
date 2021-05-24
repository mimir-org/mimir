import styled from "styled-components";
import { Position } from "react-flow-renderer";

const HandleBox = styled.div`
  top: ${(props) => props.index}%;
  right: ${(props) =>
    props.position === Position.Right ? "-10px" : "initial"};
  left: ${(props) => (props.position === Position.Left ? "-6px" : "initial")};
  position: absolute;

  .connector {
    position: absolute;
    right: -5px;
    top: -7px;
  }
`;

export default HandleBox;
