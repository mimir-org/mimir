import styled from "styled-components";

const ButtonBox = styled.div`
  margin-bottom: 30px;
  position: absolute;
  bottom: 0;
  right: ${(props) => (props.left ? "" : "30px")};
  left: ${(props) => (props.left ? "30px" : "")};
`;

export default ButtonBox;
