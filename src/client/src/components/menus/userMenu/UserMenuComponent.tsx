import * as selectors from "../../home/helpers/selectors";
import { MENU_TYPE } from "../../../models/project";
import { TextResources } from "../../../assets/text/TextResources";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { memo, useRef } from "react";
import { OnToggleDarkMode, OnLogOutClick } from "./handlers/OnUserMenuClick";
import { Icon } from "../../../compLibrary/icon/Icon";
import { DarkMode, LightMode, LogoutIcon } from "../../../assets/icons/header";
import { userStateSelector } from "../../../redux/store";
import { useAppSelector, useAppDispatch } from "store";
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
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userStateSelector);
  const isDarkMode = useAppSelector(selectors.darkModeSelector);

  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setIsUserMenuOpen(false));

  return (
    <Box id={MENU_TYPE.USER_MENU} ref={menuRef}>
      <UserNameBox>
        <UserNameText>{userState.user && userState.user.name}</UserNameText>
        <UserNameRoleText>{userState?.user?.role ?? TextResources.USER}</UserNameRoleText>
      </UserNameBox>

      <Element onClick={() => OnToggleDarkMode(dispatch, isDarkMode)}>
        <Icon size={20} src={isDarkMode ? LightMode : DarkMode} />
        <Text>{isDarkMode ? TextResources.LIGHT_MODE : TextResources.DARK_MODE}</Text>
      </Element>

      <Element onClick={() => OnLogOutClick()}>
        <Icon size={20} src={LogoutIcon} />
        <Text>{TextResources.LOGOUT}</Text>
      </Element>
    </Box>
  );
};

export default memo(UserMenuComponent);
