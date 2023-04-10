import { Icon } from "../icon/Icon";
import { MenuElementButton, MenuElementText } from "./MenuElement.styled";

interface Props {
  text: string;
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
  bottomLine?: boolean;
}

/**
 * Component for a MenuElement in the ProjectMenu.
 * @param interface
 * @returns a clickable element with an icon and text.
 */
export const MenuElement = ({ text, icon, onClick, disabled, bottomLine }: Props) => (
  <MenuElementButton onClick={() => !disabled && onClick()} disabled={disabled} bottomLine={bottomLine}>
    <Icon size={18} src={icon} alt="" />
    <MenuElementText>{text}</MenuElementText>
  </MenuElementButton>
);
