import { MimirLogo } from "../../assets/icons/mimir";
import { AvatarComponent } from "./components/AvatarComponent";
import { ProjectMenuHeaderComponent } from "./components/ProjectMenuHeaderComponent";
import { CompanyLogoBox, HeaderBox, LogoBox, HeaderRightSection } from "./HeaderComponent.styled";
import { commonStateCompanySelector, useAppSelector } from "../../redux/store";

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
export const HeaderComponent = () => {
  const company = useAppSelector(commonStateCompanySelector);

  return (
    <HeaderBox id="Header">
      <LogoBox>
        <img src={MimirLogo} alt="mimir logo" />
      </LogoBox>
      <HeaderRightSection>
        <ProjectMenuHeaderComponent />
        <CompanyLogoBox>
          {/* <img src={GetCompanyLogoForHeader(Config.COMPANY)} alt="company logo" /> */}
          <img src={company.logo} alt={company.displayName} />
        </CompanyLogoBox>
        <AvatarComponent />
      </HeaderRightSection>
    </HeaderBox>
  );
};
