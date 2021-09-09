import styled from "styled-components";
import { Color, Size } from "../..";

const InspectorBox = styled.div`
  color: ${Color.Black};
  height: ${(props: { stop: string }) => `${props.stop}px`};
  max-height: 89vh;
  min-height: ${Size.ModuleClosed}px;
  width: auto;
  min-width: 650px;
  z-index: 5;
  position: absolute;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  transition: left 0.3s ease-in-out, right 0.3s ease-in-out;

  right: ${(props) =>
    props.isLibraryOpen
      ? `${Size.ModuleOpen + Size.Margin}px`
      : `${Size.ModuleClosed + Size.Margin}px`};

  left: ${(props) =>
    props.isExplorerOpen
      ? `${Size.ModuleOpen + Size.Margin}px`
      : `${Size.ModuleClosed + Size.Margin}px`};
`;

export default InspectorBox;
