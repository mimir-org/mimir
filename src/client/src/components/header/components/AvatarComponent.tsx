import * as selectors from "../helpers/selectors";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../assets/text/TextResources";
import { AvatarBackground } from "../../../assets/icons/header";
import { GetAvatarInitials } from "../helpers/GetAvatarInitials";
import { useAppSelector } from "../../../redux/store";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../../assets/icons/chevron";
import { AvatarButton, AvatarCircle, AvatarComponentContainer, AvatarInitials } from "./AvatarComponent.styled";
import { Icon } from "../../../compLibrary/icon/Icon";
import { useState } from "react";
import { UserMenuComponent } from "../../menus/userMenu/";

/**
 * Component for the avatar icon in the header of Mimir.
 * @returns an avatar.
 */
export const AvatarComponent = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const username = useAppSelector(selectors.usernameSelector);

  return (
    <AvatarComponentContainer>
      <Tooltip content={TextResources.USERMENU} placement={"bottom"} offset={[0, 8]}>
        <AvatarButton isOpen={isUserMenuOpen} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <AvatarCircle>
            <Icon size={35} src={AvatarBackground} alt="avatar" />
            <AvatarInitials>{GetAvatarInitials(username)}</AvatarInitials>
          </AvatarCircle>
          <Icon size={10} src={isUserMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="icon" />
        </AvatarButton>
      </Tooltip>
      {isUserMenuOpen && <UserMenuComponent setIsUserMenuOpen={setIsUserMenuOpen} />}
    </AvatarComponentContainer>
  );
};
