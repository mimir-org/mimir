import Config from "../../models/Config";
import ToolbarComponent from "../toolbar/ToolbarComponent";
import { MimirLogo } from "../../assets/icons/mimir";
import { AvatarComponent, ProjectMenuHeader } from "./components";
import { CompanyLogoBox, HeaderBox, LogoBox, HeaderRightSection } from "./HeaderComponent.styled";
import { GetCompanyLogoForHeader, IsStartPage } from "../../helpers";

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
const HeaderComponent = () => {
  return (
    <>
      <HeaderBox id="Header">
        <LogoBox>
          <img src={MimirLogo} alt="mimir logo" />
        </LogoBox>
        <HeaderRightSection>
          <ProjectMenuHeader />
          <CompanyLogoBox>
            <img src={GetCompanyLogoForHeader(Config.COMPANY)} alt="company logo" />
          </CompanyLogoBox>
          <AvatarComponent />
        </HeaderRightSection>
      </HeaderBox>
      {!IsStartPage() && <ToolbarComponent />}
    </>
  );
};

export default HeaderComponent;
