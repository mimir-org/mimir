import { Icon } from "../../../../compLibrary/icon";
import { MenuElementButton, MenuElementText } from "./MenuElement.styled";

interface Props {
  text: string;
  icon: string;
  onClick?: () => void;
  disabled?: boolean | false;
  bottomLine?: boolean;
}

export const MenuElement = ({ text, icon, onClick, disabled, bottomLine = false }: Props) => (
  <MenuElementButton onClick={() => !disabled && onClick()} disabled={disabled} bottomLine={bottomLine}>
    <Icon size={18} src={icon} alt="" />
    <MenuElementText>{text}</MenuElementText>
  </MenuElementButton>
);
