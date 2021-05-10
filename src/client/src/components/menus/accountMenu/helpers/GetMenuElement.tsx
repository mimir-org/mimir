import { LogoutIcon } from "../../../../assets/icons";
import { TextResources } from "../../../../assets/textResources";
import { MenuElement, MenuLogoutBox } from "../../../../componentLibrary/box";
import { MenuButton } from "../../../../componentLibrary/buttons";
import { UserState } from "../../../../redux/store/user/types";
import { GetText, GetIcon } from "./";

interface Props {
  type: string;
  onClick?: () => void;
  user?: UserState;
}

const GetMenuElement = ({ type, onClick, user: userState }: Props) => {
  return type !== "Logout" ? (
    <MenuElement onClick={onClick}>
      {GetIcon(type)}
      <p className="text">{GetText(type)}</p>
    </MenuElement>
  ) : (
    <MenuLogoutBox>
      {userState.user && userState.user.name}
      <MenuButton>
        <img src={LogoutIcon} alt="logout" />
        {TextResources.Account_Logout}
      </MenuButton>
    </MenuLogoutBox>
  );
};

export default GetMenuElement;
