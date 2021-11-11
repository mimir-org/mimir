import { DarkMode, UserBackground } from "../../../assets/icons/header";
import { MENU_TYPE } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { MenuElement, UserMenuBox, UserNameBox } from "./styled";
import { OnDarkMode } from "./handlers";
import { darkModeSelector, userStateSelector } from "../../../redux/store";

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
        <p>{userState.user && userState.user.name}</p>
        <p className="title">User</p>
      </UserNameBox>
      <MenuElement onClick={() => OnDarkMode(dispatch, darkMode)}>
        <img src={DarkMode} className="icon" alt="darkmode" />
        <p className="text">Dark Mode</p>
      </MenuElement>
    </UserMenuBox>
  );
};

export default UserMenu;
