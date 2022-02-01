import styled from "styled-components";

interface Props {
  color: string;
}

const LibElementIconWrapper = styled.div<Props>`
  border: 3px solid ${(props: { color: string }) => props.color};
  border-radius: 5px;
  margin-right: 10px;
`;

export default LibElementIconWrapper;
