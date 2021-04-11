import styled from "styled-components";

const FacetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${(props: { indent: number }) =>
    props.indent === 1
      ? "75px"
      : props.indent === 2
      ? "90px"
      : props.indent === 3
      ? "105px"
      : props.indent === 4
      ? "120px"
      : props.indent === 5
      ? "135px"
      : "75px"};
`;

export default FacetWrapper;
