import { DarkMode, LightMode, Notifications, Settings, LogoutIcon } from "../../../assets/icons/header";
import { MENU_TYPE } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { UserMenuElement, UserMenuBox, UserNameBox } from "./styled";
import { OnDarkMode, OnLogOut } from "./handlers";
import { darkModeSelector, userStateSelector } from "../../../redux/store";
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
        <p>{userState.user && userState?.user?.name}</p>
        <p className="user-title">{userState.user && userState?.user?.role}</p>
      </UserNameBox>

      <UserMenuElement onClick={() => null}>
        <img src={Settings} className="icon" alt="settings" />
        <p className="text">{TextResources.UserMenu_Settings}</p>
      </UserMenuElement>

      <UserMenuElement onClick={() => null}>
        <img src={Notifications} className="icon" alt="notifications" />
        <p className="text">{TextResources.UserMenu_Notifications}</p>
      </UserMenuElement>

      <UserMenuElement onClick={() => OnDarkMode(dispatch, darkMode)}>
        <img src={darkMode ? LightMode : DarkMode} className="icon" alt="darkmode" />
        <p className="text">{darkMode ? TextResources.UserMenu_LightMode : TextResources.UserMenu_DarkMode}</p>
      </UserMenuElement>

      <UserMenuElement onClick={() => OnLogOut()}>
        <img src={LogoutIcon} className="icon" alt="logout" />
        <p className="text">{TextResources.UserMenu_LogOut}</p>
      </UserMenuElement>
    </UserMenuBox>
  );
};

export default UserMenuComponent;
