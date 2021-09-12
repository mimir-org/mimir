import styled from "styled-components";

const ButtonWrapper = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  margin-right: 120px;
  display: flex;
  justify-content: space-evenly;
  width: 300px;
`;

export default ButtonWrapper;
