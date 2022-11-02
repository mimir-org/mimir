import styled from "styled-components";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize, FontWeight } from "../../../../../../../../assets/font";

interface AttributesDropdownProps {
  disabled: boolean;
}

export const AttributesDropdownBox = styled.div<AttributesDropdownProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 62px;
  background-color: ${Color.WHITE};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};
`;

interface AttributesDropdownHeaderProps {
  borderColor: string;
}

export const AttributesDropdownHeaderBox = styled.div<AttributesDropdownHeaderProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 200px;
  min-width: 130px;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 2px;
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};

  p {
    margin: 0;
    padding: 1px 10px 0px 10px;
  }

  img {
    margin-right: 4px;
    padding: 5px;
  }
`;

interface AttributesDropdownListBoxProps {
  borderColor: string;
}

export const AttributesDropdownListBox = styled.div<AttributesDropdownListBoxProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 27px;
  left: 0;
  width: 100%;
  min-width: 130px;
  max-width: 180px;
  max-height: 250px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  border-radius: 2px;
  background-color: ${Color.WHITE};
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 1;
`;

interface AttributesDropdownListItemProps {
  hasCategory?: boolean;
}

export const AttributesDropdownListItem = styled.div<AttributesDropdownListItemProps>`
  display: flex;
  height: 19px;
  align-items: center;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${Color.LIGHT_SILVER};
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 5px 10px;
    margin-left: ${(props) => props.hasCategory && "10px"};
    font-weight: ${FontWeight.NORMAL};
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};

    p {
      text-decoration: underline;
    }
  }

  :last-child {
    border-width: 0;
  }
`;
