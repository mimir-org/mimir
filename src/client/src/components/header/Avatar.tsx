import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../assets/icons/chevron";
import { AvatarBackground } from "../../assets/icons/header";
import { UserState } from "../../redux/store/user/types";
import { GetUserInitials } from "../menus/userMenu/helpers";
import { OnUser } from "./handlers";
import { AvatarBox } from "./styled";

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
    <p className={"initials"}>{GetUserInitials(userState?.user?.name)}</p>
    <img src={AvatarBackground} alt="avatar" className="avatar" onClick={() => OnUser(dispatch, userMenuOpen)} />
    <img
      src={userMenuOpen ? ExpandWhiteIcon : CollapseWhiteIcon}
      alt="icon"
      className="toggle-icon"
      onClick={() => OnUser(dispatch, userMenuOpen)}
    />
  </AvatarBox>
);
export default Avatar;
