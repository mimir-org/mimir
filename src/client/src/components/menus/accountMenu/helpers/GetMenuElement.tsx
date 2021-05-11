import { LogoutIcon } from "../../../../assets/icons";
import { TextResources } from "../../../../assets/textResources";
import { MenuButton } from "../../../../componentLibrary/buttons";
import { UserState } from "../../../../redux/store/user/types";
import { GetText, GetIcon } from "./";
import { MenuElement } from "../../../../componentLibrary/box/menus";

interface Props {
  type: string;
  onClick?: () => void;
  userState?: UserState;
}

const GetMenuElement = ({ type, onClick, userState }: Props) => {
  return type !== "Logout" ? (
    <MenuElement onClick={onClick}>
      {GetIcon(type)}
      <p className="text">{GetText(type)}</p>
    </MenuElement>
  ) : (
    <MenuElement logOut>
      {userState.user && userState.user.name}
      <MenuButton>
        <img src={LogoutIcon} alt="logout" />
        {TextResources.Account_Logout}
      </MenuButton>
    </MenuElement>
  );
};

export default GetMenuElement;
