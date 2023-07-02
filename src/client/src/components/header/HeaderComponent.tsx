import { MimirLogo } from "assets/icons/mimir";
import { AvatarComponent } from "compLibrary/menu";
import { CompanyLogo } from "./components/CompanyLogo";
import { ProjectMenuHeaderComponent } from "./components/ProjectMenuHeaderComponent";
import { HeaderBox, LogoBox, HeaderRightSection } from "./HeaderComponent.styled";
import { DialogType } from "lib";

/**
 * Component props
 */
interface Props {
  projectName: string;
  userName: string;
  userRole: string;
  isDarkMode: boolean;
  isSubProject: boolean;
  hasActiveProject: boolean;
  hasSelectedNodes: boolean;
  onDarkMode: (value: boolean) => void;
  onLogOut: () => void;
  onOpenClick: (dialogType: DialogType) => void;
}

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
export const HeaderComponent = ({
  projectName,
  userName,
  userRole,
  isDarkMode,
  isSubProject,
  hasActiveProject,
  hasSelectedNodes,
  onDarkMode,
  onLogOut,
  onOpenClick,
}: Props) => {
  return (
    <HeaderBox id="Header">
      <LogoBox>
        <img src={MimirLogo} alt="mimir logo" />
      </LogoBox>
      <HeaderRightSection>
        <ProjectMenuHeaderComponent
          projectName={projectName}
          onOpenClick={onOpenClick}
          isSubProject={isSubProject}
          hasActiveProject={hasActiveProject}
          hasSelectedNodes={hasSelectedNodes}
        />
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
