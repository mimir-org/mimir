import styled from "styled-components";

interface Props {
  open: boolean;
}
const LegendHeader = styled.div<Props>`
  display: inline-flex;
  align-items: flex-end;
  padding-top: ${(props) => props.open && 6}px;
  position: relative;

  .legend-text {
    position: relative;
    right: 5px;
    opacity: 1 !important;
    bottom: 18px;
  }

  .legend-icon {
    position: relative;
    right: 7px;
    bottom: 35px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default LegendHeader;
