import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  active?: boolean;
  selectedColor?: string;
  hoverColor?: string;
}

const LibElement = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: calc(100% - 20px);
  height: 32px;
  border: 1px;
  border-color: ${(props) => (props.active ? props.selectedColor : Color.GreyInactive)} !important;
  border-style: ${(props) => (props.active ? "dashed" : "revert")} !important;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? props.hoverColor : Color.White)} !important;
  margin: 3px 1px;
  font-size: ${FontSize.Medium};
  font-family: ${FontType.Standard};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: grab;

  label {
    margin: 0px 4px;
    flex: 1;
    position: absolute;
    right: 26px;
    overflow: hidden;
  }

  &:hover {
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }
`;

export default LibElement;
