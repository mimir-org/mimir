import styled from "styled-components";

const TerminalElementWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3px 10px 2px 16px;

  button {
    display: flex;
    align-items: center;
    max-height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    margin: 0px;
  }

  .delete-icon {
    width: 10px;
    height: 10px;
  }
`;

export default TerminalElementWrapper;
