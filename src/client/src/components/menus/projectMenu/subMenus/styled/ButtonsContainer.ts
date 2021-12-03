import styled from "styled-components";

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 7px 0px 0px;
  padding-top: 15px;

  button {
    width: 83px;
    height: 34px;
    border-radius: 2px;
  }

  .text {
    padding: 0 !important;
  }
`;

export default ButtonsContainer;
