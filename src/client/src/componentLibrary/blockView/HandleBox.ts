import styled from "styled-components";
import { Position } from "react-flow-renderer";

const HandleBox = styled.div`
  top: ${(props) => props.order}%;
  right: ${(props) => props.position === Position.Right && "-10px"};
  left: ${(props) => props.position === Position.Left && "-6px"};
  position: absolute;

  .connector {
    position: absolute;
    right: -5px;
    top: -7px;
  }
`;

export default HandleBox;
