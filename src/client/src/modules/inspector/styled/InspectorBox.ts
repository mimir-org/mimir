import styled, { css } from "styled-components";
import { Color, Size } from "../../../compLibrary";

interface Props {
  isInspectorOpen: boolean;
  isLibraryOpen?: boolean;
  isExplorerOpen?: boolean;
  isTypeEditor?: boolean;
  stop: number;
  zIndex: number;
}

const InspectorBox = styled.div<Props>`
  pointer-events: ${(props) => (props.isInspectorOpen ? "initial" : "none")};
  color: ${Color.Black};
  height: ${(props) => props.stop}px;
  max-height: 89vh;
  min-height: ${Size.ModuleClosed}px;
  width: auto;
  min-width: 650px;
  z-index: ${(props) => props.zIndex};
  position: absolute;
  bottom: 0px;
  right: ${(props) => (props.isLibraryOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin)}px;
  left: ${(props) => (props.isExplorerOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin)}px;
  overflow-x: auto;
  overflow-y: hidden;
  transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
  ${(props) =>
    props.isTypeEditor &&
    css`
      height: 100%;
      right: 0px;
      left: 0px;
    `}
`;

export default InspectorBox;
