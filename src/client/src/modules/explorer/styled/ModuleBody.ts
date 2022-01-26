import styled from "styled-components";
import { Size } from "../../../compLibrary/size";

interface Props {
  visible?: boolean | true;
}

const ModuleBody = styled.div<Props>`
  float: right;
  width: ${Size.ModuleOpen};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
  height: 87%;
`;

export default ModuleBody;
