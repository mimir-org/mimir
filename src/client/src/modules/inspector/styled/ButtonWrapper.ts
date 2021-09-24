import styled from "styled-components";

const ButtonWrapper = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  display: flex;
  margin-left: auto;
  justify-content: space-evenly;
`;

export default ButtonWrapper;
