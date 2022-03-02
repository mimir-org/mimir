import styled from "styled-components";
import { Size } from "../../../compLibrary/size";
import { Color } from "../../../compLibrary/colors";

const TypeEditorInspectorWrapper = styled.div`
  display: flex;
  margin-top: auto;
  position: relative;
  background-color: ${Color.White};
  z-index: 105;
  min-height: ${Size.MODULE_CLOSED}px;
  height: ${Size.MODULE_CLOSED}px;

  & > div {
    background: ${Color.GreyLighter};
    width: 100%;
  }
`;

export default TypeEditorInspectorWrapper;
