import styled from "styled-components";

const AttributeName = styled.span`
  white-space: nowrap;
  cursor: pointer;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export default AttributeName;
