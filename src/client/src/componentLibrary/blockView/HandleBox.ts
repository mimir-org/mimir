import styled from "styled-components";

const HandleBox = styled.div`
  top: 50%;
  right: ${(props) => (props.position === "right" ? "-10px" : "initial")};
  left: ${(props) => (props.position === "left" ? "-6px" : "initial")};
  position: absolute;

  .connector {
    position: absolute;
    right: -5px;
    top: -7px;
  }
`;

export default HandleBox;
