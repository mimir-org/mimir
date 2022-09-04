import styled from "styled-components";

interface Props {
  size: number;
}

export const Icon = styled.img<Props>`
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
`;
