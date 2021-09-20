import styled from "styled-components";
import { Color, Size } from "../../../../compLibrary";

const TypeEditorWrapper = styled.div`
  position: fixed;
  top: ${Size.TopMenu_Height}px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 95%;
  height: 90%;
  background: ${Color.White};
  border: 2px solid ${Color.BlueMagenta};
  border-radius: 5px;
  z-index: 100;
`;

export default TypeEditorWrapper;
