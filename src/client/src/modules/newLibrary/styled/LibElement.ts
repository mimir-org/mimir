import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  active?: boolean;
}

const LibElement = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: calc(100% - 20px);
  height: 30px;
  border: 1px;
  border-color: ${(props) => (props.active ? Color.Black : Color.GreyDarker)} !important;
  border-style: ${(props) => (props.active ? "dashed" : "revert")} !important;
  border-radius: 3px;
  background-color: ${Color.White};
  margin: 5px 8px;
  font-size: ${FontSize.Standard};
  font-family: ${FontType.Standard};
  padding-left: 10px;
  cursor: grab;

  &:hover {
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }
`;

export default LibElement;
