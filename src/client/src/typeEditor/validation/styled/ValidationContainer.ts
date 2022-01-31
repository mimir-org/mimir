import styled from "styled-components";

interface ValidationContainerProps {
  flex?: string | number;
  minWidth?: string;
  maxWidth?: string;
}

const ValidationContainer = styled.div<ValidationContainerProps>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
`;

export default ValidationContainer;
