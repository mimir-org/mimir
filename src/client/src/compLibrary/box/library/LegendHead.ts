import styled from "styled-components";

const LegendHead = styled.div`
  display: inline;
  float: left;
  cursor: pointer;
  margin-left: 8px;
  margin-top: ${(props) => (props.open ? "6px" : "-4px")};
`;

export default LegendHead;
