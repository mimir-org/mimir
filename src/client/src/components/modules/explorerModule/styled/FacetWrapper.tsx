import styled from "styled-components";

const calculate = (indent: number) => {
  const margin = 60;
  const increase = 25;
  return margin + indent * increase;
};

const FacetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${(props: { indent: number }) => calculate(props.indent)}px;
`;

export default FacetWrapper;