import styled from "styled-components";

const LegendIcons = styled.div`
  display: inline-flex;
  align-items: flex-end;
  padding-top: ${(props) => props.open && "6px"};
  position: ${(props) => !props.open && "relative"};

  .text {
    left: -28px;
    opacity: 1 !important;
    bottom: ${(props) => !props.open && "23px"};
  }
  .icon {
    position: relative;
    left: -33px;
    bottom: ${(props) => (props.open ? "35px" : "40px")};
  }
`;

export default LegendIcons;
