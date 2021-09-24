import styled from "styled-components";

const AddTerminalElement = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 8px 2px 20px;

  img {
    padding: 0px 5px;
    opacity: 1;
  }

  img:hover {
    opacity: 1;
  }

  button {
    margin: 0px 3px;
  }

  .delete-icon {
    width: 11px;
    height: 11px;
  }
`;

export default AddTerminalElement;
