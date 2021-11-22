import styled from "styled-components";
import { Size } from "../../../compLibrary/size";

interface Props {
  open: boolean;
}

const LegendHeader = styled.div<Props>`
  display: flex;
  justify-content: center;
  position: relative;
  top: ${(props) => props.open && 6}px;
  bottom: ${(props) => !props.open && 8}px;
  width: ${Size.ModuleOpen}px;

  .legend-text {
    display: flex;
  }

  .legend-icon {
    display: flex;
    position: relative;
    right: 7px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default LegendHeader;
