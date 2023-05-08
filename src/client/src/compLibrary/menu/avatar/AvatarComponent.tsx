import { Tooltip } from "compLibrary/tooltip/Tooltip";
import { TextResources } from "assets/text/TextResources";
import { AvatarBackground } from "assets/icons/header";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "assets/icons/chevron";
import { AvatarButton, AvatarCircle, AvatarComponentContainer, AvatarInitials } from "./AvatarComponent.styled";
import { Icon } from "compLibrary/icon/Icon";
import { useState } from "react";
import { UserMenuComponent } from "./UserMenuComponent";

/**
 * Get the initals of the user
 * @param userName User full name
 * @returns User initials
 */
export const GetAvatarInitials = (userName: string): string => {
  if (userName == null) return "";

  const userNameSplit = userName.split(" ");
  let initials = "";

  if (userNameSplit) {
    const firstInitial = userNameSplit[0]?.substring(0, 1);
    if (firstInitial) initials = firstInitial;
    const lastInitial = userNameSplit[1]?.substring(0, 1);
    if (lastInitial) initials += lastInitial;
  }

  return initials;
};

/**
 * Component props
 */
interface Props {
  userName: string;
  userRole: string;
  isDarkMode: boolean;
  onDarkMode: (value: boolean) => void;
  onLogOut: () => void;
}

/**
 * Component for the avatar icon in the header of Mimir.
 * @returns an avatar.
 */
export const AvatarComponent = ({ userName, userRole, isDarkMode, onDarkMode, onLogOut }: Props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <AvatarComponentContainer>
      <Tooltip content={TextResources.USERMENU} placement={"bottom"} offset={[0, 8]}>
        <AvatarButton isOpen={isUserMenuOpen} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <AvatarCircle>
            <Icon size={35} src={AvatarBackground} alt="avatar" />
            <AvatarInitials>{GetAvatarInitials(userName)}</AvatarInitials>
          </AvatarCircle>
          <Icon size={10} src={isUserMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="icon" />
        </AvatarButton>
      </Tooltip>
      {isUserMenuOpen && (
        <UserMenuComponent
          userName={userName}
          userRole={userRole}
          isDarkMode={isDarkMode}
          onDarkMode={onDarkMode}
          onLogOut={onLogOut}
          setIsUserMenuOpen={setIsUserMenuOpen}
        />
      )}
    </AvatarComponentContainer>
  );
};
