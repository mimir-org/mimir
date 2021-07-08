import { msalInstance } from "../../../../index";
import { LogoutIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
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
    msalInstance.logoutRedirect();
  };

  return type !== "Logout" ? (
    <MenuElement onClick={onClick}>
      <div className="icon">{GetIcon(type)}</div>
      <p className="text">{GetText(type)}</p>
    </MenuElement>
  ) : (
    <MenuElement logOut>
      {userState.user && userState.user.name}
      <MenuButton onClick={logoutClick}>
        <img src={LogoutIcon} alt="logout" />

        <p className="text">{TextResources.Account_Logout}</p>
      </MenuButton>
    </MenuElement>
  );
};

export default GetMenuElement;
