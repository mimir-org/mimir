import styled from "styled-components";
import { Color, Size } from "../..";

const FilterMenuBox = styled.div`
  position: absolute;
  top: 97px;
  right: ${(props) =>
    !props.isLibraryOpen
      ? `${Size.ModuleClosed + Size.Margin}px`
      : `${Size.ModuleOpen + Size.Margin}px`};
  background: ${Color.White};
  padding-bottom: 6px;
  padding-top: 8px;
  min-width: ${Size.ModuleOpen}px;
  border-style: solid;
  border-color: ${Color.GreyBorder};
  border-width: 0px 0px 1px 1px;
  z-index: 6;
`;

export default FilterMenuBox;
