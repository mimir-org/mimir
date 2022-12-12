import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";
import { commonStateCompaniesSelector, useAppSelector } from "../redux/store";

/**
 * Hook used for getting company based on domain.
 */
export const useCompanySelector = (domain: string, id: string): MimirorgCompanyCm | null => {
  const companies = useAppSelector(commonStateCompaniesSelector);
  const d = domain && domain.length > 0 ? domain : id?.split("_")[0];

  return companies?.find((x) => x.domain === d);
};
