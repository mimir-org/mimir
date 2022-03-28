import styled from "styled-components";
import { Size } from "../../compLibrary/size/Size";
import { Color } from "../../compLibrary/colors/Color";

const TypeEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: ${Size.TOPMENU_HEIGHT}px;
  left: calc(1.6px + ${Size.MODULE_CLOSED}px);
  width: 95%;
  height: calc(100% - ${Size.TOPMENU_HEIGHT}px - ${Size.MODULE_CLOSED}px);
  background: ${Color.WHITE};
  border: 2px solid ${Color.BASTILLE};
  border-radius: 5px;
  z-index: 100;
`;

export default TypeEditorWrapper;
