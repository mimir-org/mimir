import styled from "styled-components";

const LegendIcons = styled.div`
  display: inline-flex;
  align-items: flex-end;
  padding-top: ${(props) => props.open && "6px"};
`;

export default LegendIcons;
