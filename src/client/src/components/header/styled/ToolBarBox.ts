import styled from "styled-components";
import { Size } from "../../../compLibrary/size";
import { Color } from "../../../compLibrary/colors";

interface Props {
  libOpen: boolean;
  explorerOpen: boolean;
}

const ToolBarBox = styled.div<Props>`
  background-color: ${Color.White};
  color: ${Color.Black};
  height: 40px;
  width: auto;
  border-bottom: 1px solid ${Color.Grey};
  position: absolute;
  top: ${Size.TopMenu_Height}px;
  display: inline;
  transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
  z-index: 5;

  right: ${(props) => (props.libOpen ? Size.ModuleOpen : Size.ModuleClosed)}px;
  left: ${(props) => (props.explorerOpen ? Size.ModuleOpen : Size.ModuleClosed)}px;
`;

export default ToolBarBox;
