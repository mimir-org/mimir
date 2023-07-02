import { MENU_TYPE } from "models/project";
import { TextResources } from "assets/text/TextResources";
import { useOutsideClick } from "hooks/useOutsideClick";
import { memo, useRef } from "react";
import { Box, Element, Text, UserNameBox, UserNameRoleText, UserNameText } from "./UserMenuComponent.styled";
import { Icon, DarkModeIcon, LightModeIcon, LogoutIcon } from "@mimirorg/component-library";

interface Props {
  userName: string;
  userRole: string;
  isDarkMode: boolean;
  setIsUserMenuOpen: (value: boolean) => void;
  onDarkMode: (value: boolean) => void;
  onLogOut: () => void;
}

/**
 * Component for the User Menu.
 * @param interface
 * @returns a menu for the user in the header of Mimir.
 */
export const UserMenuComponent = ({ userName, userRole, isDarkMode, setIsUserMenuOpen, onDarkMode, onLogOut }: Props) => {
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setIsUserMenuOpen(false));

  return (
    <Box id={MENU_TYPE.USER_MENU} ref={menuRef}>
      <UserNameBox>
        <UserNameText>{userName ?? ""}</UserNameText>
        <UserNameRoleText>{userRole ?? ""}</UserNameRoleText>
      </UserNameBox>

      <Element onClick={() => onDarkMode(!isDarkMode)}>
        <Icon size={20} src={isDarkMode ? LightModeIcon : DarkModeIcon} />
        <Text>{isDarkMode ? TextResources.LIGHT_MODE : TextResources.DARK_MODE}</Text>
      </Element>

      <Element onClick={onLogOut}>
        <Icon size={20} src={LogoutIcon} />
        <Text>{TextResources.LOGOUT}</Text>
      </Element>
    </Box>
  );
};

export default memo(UserMenuComponent);
