import styled from "styled-components";
import { Color, Size } from "../..";

interface Props {
  libraryOpen: boolean;
}

const FilterMenuBox = styled.div<Props>`
  position: absolute;
  top: 97px;
  right: ${(props) => (!props.libraryOpen ? Size.ModuleClosed + Size.Margin : Size.ModuleOpen + Size.Margin)}px;
  background: ${Color.White};
  padding: 8px 0px 6px 0px;
  min-width: ${Size.ModuleOpen}px;
  border-style: solid;
  border-color: ${Color.Grey};
  border-width: 0px 0px 1px 1px;
  z-index: 5;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  transition: right 0.2s ease-in-out;
`;

export default FilterMenuBox;
