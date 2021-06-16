import { authProvider } from "../../../../providers/authProvider";
import { LogoutIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/textResources";
import { MenuButton } from "../../../../compLibrary/buttons";
import { UserState } from "../../../../redux/store/user/types";
import { MenuElement } from "../../../../compLibrary/box/menus";
import { GetText, GetIcon } from "./";

interface Props {
  type: string;
  onClick?: () => void;
  userState?: UserState;
}

const GetMenuElement = ({ type, onClick, userState }: Props) => {
  const logoutClick = () => {
    authProvider.logout();
  };

  return type !== "Logout" ? (
    <MenuElement onClick={onClick}>
      {GetIcon(type)}
      <p className="text">{GetText(type)}</p>
    </MenuElement>
  ) : (
    <MenuElement logOut>
      {userState.user && userState.user.name}
      <MenuButton onClick={logoutClick}>
        <img src={LogoutIcon} alt="logout" />
        {TextResources.Account_Logout}
      </MenuButton>
    </MenuElement>
  );
};

export default GetMenuElement;
