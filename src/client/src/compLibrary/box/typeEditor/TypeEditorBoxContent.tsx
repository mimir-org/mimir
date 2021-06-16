import styled from "styled-components";
import { Color, FontSize } from "../..";

const TypeEditorBoxContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 110px;
  height: 32px;
  margin: 0px 20px 0px 17px;
  padding: 0px 10px;
  border: 1px solid ${Color.DeepCyan};
  border-radius: 2px;
  background-color: ${Color.White};
  cursor: pointer;
  color: ${Color.Black};
  font-size: ${FontSize.Standard};
  white-space: nowrap;
`;

export default TypeEditorBoxContent;
