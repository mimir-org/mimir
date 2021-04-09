import styled from "styled-components";

const FacetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${(props: { margin: string }) => props.margin}px;
`;

export default FacetWrapper;
