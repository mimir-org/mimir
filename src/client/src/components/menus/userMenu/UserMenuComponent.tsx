import { DarkMode, Notifications, OffIcon, OnIcon, Settings, UserBackground, LogoutIcon } from "../../../assets/icons/header";
import { MENU_TYPE } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { MenuElement, UserMenuBox, UserNameBox } from "./styled";
import { OnDarkMode, OnLogOut } from "./handlers";
import { darkModeSelector, userStateSelector } from "../../../redux/store";
import { GetUserInitials } from "./helpers";
import { TextResources } from "../../../assets/text";

/**
 * Component for the User Menu.
 * @returns a menu for the user in the header of Mimir.
 */
const UserMenuComponent = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(darkModeSelector);
  const userState = useAppSelector(userStateSelector);

  return (
    <UserMenuBox id={MENU_TYPE.PROJECT_MENU}>
      <UserNameBox>
        <img src={UserBackground} alt="user" className="user-icon" />
        <p className={"initials"}>{GetUserInitials(userState?.user?.name)}</p>
        <p>{userState.user && userState.user.name}</p>
        <p className="user-title">{TextResources.UserMenu_User}</p>
      </UserNameBox>

      <MenuElement onClick={() => null}>
        <img src={Settings} className="icon" alt="settings" />
        <p className="text">{TextResources.UserMenu_Settings}</p>
      </MenuElement>

      <MenuElement onClick={() => null}>
        <img src={Notifications} className="icon" alt="notifications" />
        <p className="text">{TextResources.UserMenu_Notifications}</p>
      </MenuElement>

      <MenuElement onClick={() => OnDarkMode(dispatch, darkMode)}>
        <img src={DarkMode} className="icon" alt="darkmode" />
        <p className="text">{TextResources.UserMenu_DarkMode}</p>
        <p className="darkmode-text">{darkMode ? TextResources.UserMenu_DarkModeOff : TextResources.UserMenu_DarkModeOn}</p>
        <img src={darkMode ? OffIcon : OnIcon} className="toggle" alt="toggle" />
      </MenuElement>

      <MenuElement onClick={() => OnLogOut()}>
        <img src={LogoutIcon} className="icon" alt="logout" />
        <p className="text">{TextResources.UserMenu_LogOut}</p>
      </MenuElement>
    </UserMenuBox>
  );
};

export default UserMenuComponent;
