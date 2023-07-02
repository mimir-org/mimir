import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";
import { commonStateSelector, useAppSelector } from "store";
import { CommonState } from "store/reducers/commonReducer";

/**
 * Hook used for getting company based on domain.
 */
export const useCompanySelector = (domain: string, id: string): MimirorgCompanyCm | null => {
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const d = domain && domain.length > 0 ? domain : id?.split("_")[0];

  return commonState?.companies?.find((x) => x.domain === d);
};
