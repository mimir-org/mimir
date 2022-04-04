import styled from "styled-components";
import { Size } from "../../../compLibrary/size/Size";
import { Color } from "../../../compLibrary/colors/Color";

const TypeEditorInspectorWrapper = styled.div`
  display: flex;
  margin-top: auto;
  position: relative;
  background-color: ${Color.WHITE};
  z-index: 105;
  min-height: ${Size.MODULE_CLOSED}px;
  height: ${Size.MODULE_CLOSED}px;

  & > div {
    background: ${Color.GHOST_WHITE};
    width: 100%;
  }
`;

export default TypeEditorInspectorWrapper;
