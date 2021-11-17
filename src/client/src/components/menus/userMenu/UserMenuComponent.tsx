import { DarkMode, Notifications, OffIcon, OnIcon, Settings, UserBackground, LogoutIcon } from "../../../assets/icons/header";
import { MENU_TYPE } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { UserMenuElement, UserMenuBox, UserNameBox, AvatarBox } from "./styled";
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
        <AvatarBox>
          <p className={"initials"}>{GetUserInitials(userState?.user?.name)}</p>
          <img src={UserBackground} alt="profile" className="profile" />
        </AvatarBox>
        <p>{userState.user && userState?.user?.name}</p>
        <p className="user-title">{TextResources.UserMenu_User}</p>
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
        <img src={DarkMode} className="icon" alt="darkmode" />
        <p className="text">{TextResources.UserMenu_DarkMode}</p>
        <p className="darkmode-text">{darkMode ? TextResources.UserMenu_DarkModeOn : TextResources.UserMenu_DarkModeOff}</p>
        <img src={darkMode ? OnIcon : OffIcon} className="toggle" alt="toggle" />
      </UserMenuElement>

      <UserMenuElement onClick={() => OnLogOut()}>
        <img src={LogoutIcon} className="icon" alt="logout" />
        <p className="text">{TextResources.UserMenu_LogOut}</p>
      </UserMenuElement>
    </UserMenuBox>
  );
};

export default UserMenuComponent;
