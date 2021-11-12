import { DarkMode, Notifications, OffIcon, Settings, UserBackground } from "../../../assets/icons/header";
import { MENU_TYPE } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { MenuElement, UserMenuBox, UserNameBox } from "./styled";
import { OnDarkMode } from "./handlers";
import { darkModeSelector, userStateSelector } from "../../../redux/store";
import { GetUserInitials } from "./helpers";

/**
 * Component for the User Menu.
 * @returns a menu for the user in the header of Mimir.
 */
const UserMenu = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(darkModeSelector);
  const userState = useAppSelector(userStateSelector);

  return (
    <UserMenuBox id={MENU_TYPE.PROJECT_MENU}>
      <UserNameBox>
        <img src={UserBackground} alt="user" className="user-icon" />
        <p className={"initials"}>{GetUserInitials(userState?.user?.name)}</p>
        <p>{userState.user && userState.user.name}</p>
        <p className="user-title">User</p>
      </UserNameBox>
      <MenuElement onClick={() => null}>
        <img src={Settings} className="icon" alt="settings" />
        <p className="text">User Settings</p>
      </MenuElement>
      <MenuElement onClick={() => null}>
        <img src={Notifications} className="icon" alt="notifications" />
        <p className="text">Show all Notifications</p>
      </MenuElement>
      <MenuElement onClick={() => OnDarkMode(dispatch, darkMode)}>
        <img src={DarkMode} className="icon" alt="darkmode" />
        <p className="text">Dark Mode</p>
        <img src={OffIcon} className="toggle" alt="toggle" />
      </MenuElement>
    </UserMenuBox>
  );
};

export default UserMenu;
