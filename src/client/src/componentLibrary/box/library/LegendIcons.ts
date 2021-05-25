import styled from "styled-components";

const LegendIcons = styled.div`
  display: inline-flex;
  align-items: flex-end;
  padding-top: ${(props) => props.open && "6px"};
  position: ${(props) => !props.open && "relative"};
  top: ${(props) => !props.open && "-10px"};
`;

export default LegendIcons;
