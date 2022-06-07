import styled from "styled-components";
import { Color } from "../../../assets/color/Color";
import { FontWeight } from "../../../assets/font";
import { ParameterInputsWrapper } from "../../../modules/inspector/components/tabs/components/shared/components/parametersContent/components/row/components/Parameter.styled";

interface DropdownBoxProps {
  disabled: boolean;
  fontSize?: string;
}

export const DropdownBox = styled.div<DropdownBoxProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  background-color: ${Color.WHITE};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  font-size: ${(props) => props.fontSize};
  color: ${Color.BLACK};

  ${ParameterInputsWrapper} & {
    flex: 1;
  }
`;

interface DropdownHeaderBoxProps {
  height: number;
  borderColor: string;
  borderRadius: number;
  fontSize: string;
}

export const DropdownHeaderBox = styled.div<DropdownHeaderBoxProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.height}px;
  width: inherit;
  background: ${Color.WHITE};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  font-size: ${(props) => props.fontSize};
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

interface DropdownListBoxProps {
  top: number;
  borderColor: string;
  borderRadius: number;
}

export const DropdownListBox = styled.div<DropdownListBoxProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => props.top}px;
  left: 0;
  width: inherit;
  max-height: 250px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  background-color: inherit;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 1;
`;

interface DropdownListItemProps {
  height: number;
  borderRadius: number;
  fontSize: string;
  hasCategory?: boolean;
}

export const DropdownListItem = styled.div<DropdownListItemProps>`
  display: flex;
  height: ${(props) => props.height}px;
  align-items: center;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${Color.LIGHT_SILVER};
  font-size: ${(props) => props.fontSize};
  color: ${Color.BLACK};
  background-color: ${Color.WHITE};
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
