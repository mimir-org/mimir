import { CompanyLogoBox } from "./../HeaderComponent.styled";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

/**
 * Component for the avatar icon in the header of Mimir.
 * @returns an avatar.
 */
interface CompanyLogoProps {
  company: MimirorgCompanyCm;
}
export const CompanyLogo = ({ company }: CompanyLogoProps) => {
  return (
    <>
      {company?.logo && company?.homePage && (
        <CompanyLogoBox>
          <a href={company.homePage} target="_blank" rel="noopener noreferrer">
            <img src={company.logo} alt={company?.displayName} />
          </a>
        </CompanyLogoBox>
      )}
      {company?.logo && !company?.homePage && (
        <CompanyLogoBox>
          <img src={company.logo} alt={company?.displayName} />
        </CompanyLogoBox>
      )}
    </>
  );
};
