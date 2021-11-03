import { AibelInvertedLogo } from "../../../assets/icons/aibel/inspector";
import { EquinorInvertedLogo } from "../../../assets/icons/equinor/inspector";

const GetHeaderCompanyLogo = (company: string) => {
  if (company === "aibel.com") return AibelInvertedLogo;
  if (company === "equinor.com") return EquinorInvertedLogo;
  return null;
};

export default GetHeaderCompanyLogo;
