import { MENU_TYPE } from "../../../lib/models/project";
import { TextResources } from "../../../assets/text/TextResources";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { memo, useRef } from "react";
import { OnLogOutClick } from "./handlers/OnUserMenuClick";
import { Icon } from "../../../compLibrary/icon/Icon";
import { LogoutIcon } from "../../../assets/icons/header";
import { Box, Element, Text, UserNameBox, UserNameRoleText, UserNameText } from "./UserMenuComponent.styled";

interface Props {
  setIsUserMenuOpen: (value: boolean) => void;
}

/**
 * Component for the User Menu.
 * @param interface
 * @returns a menu for the user in the header of Mimir.
 */
export const UserMenuComponent = ({ setIsUserMenuOpen }: Props) => {
  const userState = "Test User";

  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setIsUserMenuOpen(false));

  return (
    <Box id={MENU_TYPE.USER_MENU} ref={menuRef}>
      <UserNameBox>
        <UserNameText>{userState}</UserNameText>
        <UserNameRoleText>{userState}</UserNameRoleText>
      </UserNameBox>

      <Element onClick={() => OnLogOutClick()}>
        <Icon size={20} src={LogoutIcon} />
        <Text>{TextResources.LOGOUT}</Text>
      </Element>
    </Box>
  );
};

export default memo(UserMenuComponent);
