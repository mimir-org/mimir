import { commonStateSelector, useAppSelector } from "store";
import { CommonState } from "store/reducers/commonReducer";
import { CompanyLogoBox } from "./../HeaderComponent.styled";

/**
 * Component for the avatar icon in the header of Mimir.
 * @returns an avatar.
 */
export const CompanyLogo = () => {
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const company = commonState?.company;

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
