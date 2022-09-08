import { commonStateCompanySelector, useAppSelector } from "../../../redux/store";
import { CompanyLogoBox } from "./../HeaderComponent.styled";

/**
 * Component for the avatar icon in the header of Mimir.
 * @returns an avatar.
 */
export const CompanyLogo = () => {
  const company = useAppSelector(commonStateCompanySelector);

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
