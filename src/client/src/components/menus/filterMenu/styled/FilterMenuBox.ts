import styled from "styled-components";
import { Size } from "../../../../compLibrary/size";
import { Color } from "../../../../compLibrary/colors";

interface Props {
  libraryOpen: boolean;
}

const FilterMenuBox = styled.div<Props>`
  position: absolute;
  top: 95px;
  right: ${(props) => (!props.libraryOpen ? Size.ModuleClosed + Size.Margin : Size.ModuleOpen + Size.Margin)}px;
  background: ${Color.White};
  padding: 8px 0px 6px 0px;
  width: 350px;
  min-height: 140px;
  height: auto;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
  border-width: 0px 0px 1px 1px;
  border-bottom-left-radius: 10px;
  z-index: 5;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  transition: right 0.2s ease-in-out;
`;

export default FilterMenuBox;
