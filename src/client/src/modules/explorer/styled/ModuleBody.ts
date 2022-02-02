import styled from "styled-components";
import { Size } from "../../../compLibrary/size";

interface Props {
  visible?: boolean | true;
}

const ModuleBody = styled.div<Props>`
  width: ${Size.ModuleOpen}px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
  height: calc(100% - 127px);
`;

export default ModuleBody;
