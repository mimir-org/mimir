import styled from "styled-components";

const FacetContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  background-color: ${(props: { color: string }) =>
    props.color === "Function"
      ? "rgba(254, 244, 69, 0.15)"
      : props.color === "Product"
      ? "rgba(0, 240, 255, 0.15)"
      : props.color === "Location"
      ? "rgba(250, 0, 255, 0.15)"
      : "#f2f2f2"};
`;

export default FacetContainerWrapper;
