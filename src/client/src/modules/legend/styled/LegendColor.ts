import styled from "styled-components";

const LegendColor = styled.span`
  width: 90px;
  height: 2px;
  background-color: ${(props: { color: string }) => props.color};
`;

export default LegendColor;
