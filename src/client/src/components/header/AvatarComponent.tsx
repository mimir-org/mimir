import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../assets/icons/chevron";
import { AvatarBackground } from "../../assets/icons/header";
import { UserState } from "../../redux/store/user/types";
import { GetAvatarInitials } from "../menus/userMenu/helpers";
import { OnUser } from "./handlers";
import { AvatarBox, AvatarCircle, AvatarInitials } from "./styled";

interface Props {
  userMenuOpen: boolean;
  userState: UserState;
  dispatch: any;
}
/**
 * Component for the avatar icon in the header of Mimir.
 * @param interface
 * @returns an avatar.
 */
const Avatar = ({ userMenuOpen, userState, dispatch }: Props) => (
  <AvatarBox isOpen={userMenuOpen} onClick={() => OnUser(dispatch, userMenuOpen)}>
    <AvatarCircle>
      <img src={AvatarBackground} alt="avatar" onClick={() => OnUser(dispatch, userMenuOpen)} />{" "}
      <AvatarInitials>{GetAvatarInitials(userState?.user?.name)}</AvatarInitials>
    </AvatarCircle>
    <img
      src={userMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon}
      alt="icon"
      className="toggle-icon"
      onClick={() => OnUser(dispatch, userMenuOpen)}
    />
  </AvatarBox>
);
export default Avatar;
