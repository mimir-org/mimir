import styled from "styled-components";

interface Props {
  indent?: string;
}

const AspectElementWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: ${(props) => props.indent && props.indent};
`;

export default AspectElementWrapper;
