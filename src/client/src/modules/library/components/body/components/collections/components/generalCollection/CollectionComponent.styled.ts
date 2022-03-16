import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary/colors/Color";
import { FontSize, FontType } from "../../../../../../../../compLibrary/font";

interface CollectionComponentButtonProps {
  active?: boolean;
}

export const CollectionComponentButton = styled.button<CollectionComponentButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: calc(100% - 20px);
  height: 32px;
  border: 1px;
  border-color: ${(props) => (props.active ? Color.BASTILLE : Color.SILVER)};
  border-style: solid;
  border-radius: 5px;
  background-color: ${Color.WHITE};
  margin: 3px 1px;
  font-size: ${FontSize.MEDIUM};
  font-family: ${FontType.STANDARD};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  label {
    margin: 0 4px;
    flex: 1;
    position: absolute;
    right: 26px;
    overflow: hidden;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const CollectionComponentIcon = styled.span``;

export const CollectionComponentText = styled.span`
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
