import styled from "styled-components";
import { Color, Size } from "../..";

const InspectorBox = styled.div`
  color: ${Color.Black};
  height: ${(props: { stop: string }) => `${props.stop}px`};
  max-height: 1240px;
  min-height: ${Size.ModuleClosed}px;
  width: auto;
  min-width: 650px;
  z-index: 5;
  position: absolute;
  bottom: 0;
  right: ${(props) => (props.isLibraryOpen ? "333px" : "37px")};
  left: ${(props) => (props.isExplorerOpen ? "333px" : "37px")};
  transition: left 0.3s ease-in-out, right 0.3s ease-in-out;
  overflow-x: auto;
  overflow-y: hidden;
`;

export default InspectorBox;
