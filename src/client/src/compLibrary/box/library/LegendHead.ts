import styled from "styled-components";

const LegendHead = styled.div`
  display: inline;
  float: right;
  cursor: pointer;
  margin-right: 10px;
  margin-top: -14px;
  padding-top: ${(props) => !props.open && "6px"};
`;

export default LegendHead;
