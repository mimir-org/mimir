import styled from "styled-components";

const FacetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${(props: { indent: number }) =>
    props.indent === 1
      ? "85px"
      : props.indent === 2
      ? "110px"
      : props.indent === 3
      ? "135px"
      : props.indent === 4
      ? "160px"
      : props.indent === 5
      ? "185px"
      : "85px"};
`;

export default FacetWrapper;
