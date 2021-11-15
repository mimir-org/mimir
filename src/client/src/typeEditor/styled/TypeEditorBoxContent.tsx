import styled from "styled-components";
import { Color } from "../../compLibrary/colors";
import { FontSize } from "../../compLibrary/font";

interface Props {
  active: boolean;
}

const TypeEditorBoxContent = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 110px;
  height: 32px;
  margin: 0px 9px 0px 2px;
  padding: 0px 10px;
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  background-color: ${(props) => (props.active ? Color.White : Color.Grey)};
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  color: ${Color.Black};
  font-size: ${FontSize.Standard};
  white-space: nowrap;

  .typeeditor_box {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex: 1;
  }
`;

export default TypeEditorBoxContent;
