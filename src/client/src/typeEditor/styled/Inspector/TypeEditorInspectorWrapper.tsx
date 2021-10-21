import styled from "styled-components";
import { Color } from "../../../compLibrary";

const TypeEditorInspectorWrapper = styled.div`
  display: flex;
  margin-top: auto;
  position: relative;
  background-color: ${Color.Grey};
  z-index: 105;
  height: 355px;

  & > div {
    background: ${Color.LightGrey};
    width: 100%;
  }
`;

export default TypeEditorInspectorWrapper;
