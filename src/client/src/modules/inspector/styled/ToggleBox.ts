import styled from "styled-components";

const ToggleBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px;
  pointer-events: initial;
  border: 0;
  background: transparent;

  :hover {
    cursor: pointer;
  }
`;

export default ToggleBox;
