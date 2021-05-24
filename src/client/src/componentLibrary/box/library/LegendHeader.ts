import styled from "styled-components";

const LegendHeader = styled.div`
  display: inline;
  float: right;
  cursor: pointer;
  margin-right: 17px;
  padding-top: ${(props) => props.open && "6px"};
`;

export default LegendHeader;
