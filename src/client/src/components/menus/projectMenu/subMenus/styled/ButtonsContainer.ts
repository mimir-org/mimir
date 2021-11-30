import styled from "styled-components";

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;

  img {
    display: none;
  }

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
