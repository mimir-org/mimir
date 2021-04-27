import styled from "styled-components";

const calculate = (indent: number) => {
  const margin = 50;
  const increase = 20;
  return margin + indent * increase;
};

const AspectChildWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
  margin-left: ${(props: { indent: number }) => calculate(props.indent)}px;
`;

export default AspectChildWrapper;
