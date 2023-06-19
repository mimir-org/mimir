import styled from "styled-components";

interface ExpandButtonContainerProps {
  isOpen?: boolean;
}

export const ExpandButtonContainer = styled.button<ExpandButtonContainerProps>`
  line-height: 0;
  background: transparent;
  border: 0;
  cursor: pointer;

  padding: ${(props) => !props.isOpen && "18px"} 10px 10px;
`;
