import styled from "styled-components";

export const NavigationButton = styled.button`
  padding: 10px 5px;
  margin: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  pointer-events: all;

  :disabled {
    cursor: not-allowed;
  }

  img {
    pointer-events: none;
  }
`;
