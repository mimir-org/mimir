import styled from "styled-components";

interface Props {
  indent?: string;
}

export const AspectElementWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: ${(props) => props.indent};
`;
