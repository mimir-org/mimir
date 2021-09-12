import { LogoutIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
import { MenuButton } from "../../../../compLibrary/buttons";
import { UserState } from "../../../../redux/store/user/types";
import { MenuElement } from "../../../../compLibrary/box/menus";
import { GetText, GetIcon } from "./";
import { OnLogOutClick } from "../handlers/";

interface Props {
  type: string;
  onClick?: () => void;
  userState?: UserState;
}

const GetMenuElement = ({ type, onClick, userState }: Props) => {
  return type !== TextResources.Account_Logout ? (
    <MenuElement onClick={onClick}>
      <div className="icon">{GetIcon(type)}</div>
      <p className="text">{GetText(type)}</p>
    </MenuElement>
  ) : (
    <MenuElement logOut>
      {userState.user && userState.user.name}
      <MenuButton onClick={() => OnLogOutClick()}>
        <img src={LogoutIcon} alt="logout" />

        <p className="text">{TextResources.Account_Logout_Label}</p>
      </MenuButton>
    </MenuElement>
  );
};

export default GetMenuElement;
