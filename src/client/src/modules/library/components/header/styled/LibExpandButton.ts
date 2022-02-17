import styled from "styled-components";

interface Props {
  isOpen?: boolean;
}

export const LibExpandButton = styled.button<Props>`
  line-height: 0;
  background: transparent;
  border: 0;
  cursor: pointer;

  padding: ${(props) => !props.isOpen && "24px"} 10px 10px;
`;
