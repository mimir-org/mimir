import styled from "styled-components";
import { Color, Size } from "../../../compLibrary";

const TypeEditorInspectorWrapper = styled.div`
  display: flex;
  margin-top: auto;
  position: relative;
  background-color: ${Color.White};
  z-index: 105;
  min-height: ${Size.ModuleClosed}px;
  height: ${Size.ModuleClosed}px;

  & > div {
    background: ${Color.LightGrey};
    width: 100%;
  }
`;

export default TypeEditorInspectorWrapper;
