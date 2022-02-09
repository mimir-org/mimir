import * as selectors from "../../home/helpers/selectors";
import { MENU_TYPE } from "../../../models/project";
import { TextResources } from "../../../assets/text";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { memo, useRef } from "react";
import { OnDarkMode, OnLogOut } from "./handlers";
import {
  UserMenuBox,
  UserMenuElement,
  UserMenuElementText,
  UserNameBox,
  UserNameRoleText,
  UserNameText,
} from "./UserMenuComponent.styled";
import { DarkMode, LightMode, LogoutIcon } from "../../../assets/icons/header";
import { useAppDispatch, useAppSelector, userStateSelector } from "../../../redux/store";
import { Icon } from "../../../compLibrary/icon";

interface Props {
  setIsUserMenuOpen: (value: boolean) => void;
}

/**
 * Component for the User Menu.
 * @param interface
 * @returns a menu for the user in the header of Mimir.
 */
const UserMenuComponent = ({ setIsUserMenuOpen }: Props) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userStateSelector);
  const darkMode = useAppSelector(selectors.darkModeSelector);

  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setIsUserMenuOpen(false));

  return (
    <UserMenuBox id={MENU_TYPE.USER_MENU} ref={menuRef}>
      <UserNameBox>
        <UserNameText>{userState.user && userState?.user?.name}</UserNameText>
        <UserNameRoleText>{userState?.user?.role ?? TextResources.UserMenu_User}</UserNameRoleText>
      </UserNameBox>

      {/* <UserMenuElement onClick={() => null}>
        <Icon size={20} src={Settings} className="icon" alt="settings" />
        <p className="text">{TextResources.UserMenu_Settings}</p>
      </UserMenuElement> */}

      {/* <UserMenuElement onClick={() => null}>
        <Icon size={20} className="icon" alt="notifications" />
        <p className="text">{TextResources.UserMenu_Notifications}</p>
      </UserMenuElement> */}

      <UserMenuElement onClick={() => OnDarkMode(dispatch, darkMode)}>
        <Icon size={20} src={darkMode ? LightMode : DarkMode} />
        <UserMenuElementText>{darkMode ? TextResources.UserMenu_LightMode : TextResources.UserMenu_DarkMode}</UserMenuElementText>
      </UserMenuElement>

      <UserMenuElement onClick={() => OnLogOut()}>
        <Icon size={20} src={LogoutIcon} />
        <UserMenuElementText>{TextResources.UserMenu_LogOut}</UserMenuElementText>
      </UserMenuElement>
    </UserMenuBox>
  );
};

export default memo(UserMenuComponent);
