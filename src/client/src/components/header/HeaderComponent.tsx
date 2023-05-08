import { MimirLogo } from "assets/icons/mimir";
import { AvatarComponent } from "compLibrary/menu";
import { CompanyLogo } from "./components/CompanyLogo";
import { ProjectMenuHeaderComponent } from "./components/ProjectMenuHeaderComponent";
import { HeaderBox, LogoBox, HeaderRightSection } from "./HeaderComponent.styled";

/**
 * Component props
 */
interface Props {
  projectName: string;
  userName: string;
  userRole: string;
  isDarkMode: boolean;
  onDarkMode: (value: boolean) => void;
  onLogOut: () => void;
}

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
export const HeaderComponent = ({ projectName, userName, userRole, isDarkMode, onDarkMode, onLogOut }: Props) => {
  return (
    <HeaderBox id="Header">
      <LogoBox>
        <img src={MimirLogo} alt="mimir logo" />
      </LogoBox>
      <HeaderRightSection>
        <ProjectMenuHeaderComponent projectName={projectName} />
        <CompanyLogo />
        <AvatarComponent
          userName={userName}
          userRole={userRole}
          isDarkMode={isDarkMode}
          onDarkMode={onDarkMode}
          onLogOut={onLogOut}
        />
      </HeaderRightSection>
    </HeaderBox>
  );
};
