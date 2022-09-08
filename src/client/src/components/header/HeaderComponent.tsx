import { MimirLogo } from "../../assets/icons/mimir";
import { AvatarComponent } from "./components/AvatarComponent";
import { CompanyLogo } from "./components/CompanyLogo";
import { ProjectMenuHeaderComponent } from "./components/ProjectMenuHeaderComponent";
import { HeaderBox, LogoBox, HeaderRightSection } from "./HeaderComponent.styled";

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
export const HeaderComponent = () => {
  return (
    <HeaderBox id="Header">
      <LogoBox>
        <img src={MimirLogo} alt="mimir logo" />
      </LogoBox>
      <HeaderRightSection>
        <ProjectMenuHeaderComponent />
        <CompanyLogo />
        <AvatarComponent />
      </HeaderRightSection>
    </HeaderBox>
  );
};
