import styled from "styled-components";
import { Color } from "../../compLibrary/colors";
import { FontSize, FontType } from "../../compLibrary/font";

interface LibElementProps {
  active?: boolean;
  selectedColor?: string;
  hoverColor?: string;
}

export const LibElement = styled.button<LibElementProps>`
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
    margin: 0 4px;
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

interface LibElementIconWrapperProps {
  color: string;
}

export const LibElementIconWrapper = styled.span<LibElementIconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  height: 25px;
  width: 30px;
  background-color: ${Color.White};
  box-shadow: inset 0 0 0 1px ${Color.Black};
  border: 3px solid ${(props: { color: string }) => props.color};
  border-radius: 5px;
`;

export const LibElementText = styled.span`
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LibElementVersion = styled.span`
  flex: 1;
  position: absolute;
  right: 55px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FavoriteBox = styled.span`
  margin-left: auto;
  padding: 5px;

  :hover {
    cursor: pointer;
  }
`;
