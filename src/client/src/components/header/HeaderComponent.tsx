import { MimirLogo } from "../../assets/icons/mimir";
import { CompanyLogo } from "./components/CompanyLogo";
import { ProjectMenuHeaderComponent } from "./components/ProjectMenuHeaderComponent";
import { HeaderBox, LogoBox, HeaderRightSection } from "./HeaderComponent.styled";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
interface HeaderComponentProps {
  company: MimirorgCompanyCm;
}
export default function HeaderComponent({ company }: HeaderComponentProps) {
  return (
    <HeaderBox id="Header">
      <LogoBox>
        <img src={MimirLogo} alt="mimir logo" />
      </LogoBox>
      <HeaderRightSection>
        <ProjectMenuHeaderComponent />
        <CompanyLogo company={company} />
      </HeaderRightSection>
    </HeaderBox>
  );
}
