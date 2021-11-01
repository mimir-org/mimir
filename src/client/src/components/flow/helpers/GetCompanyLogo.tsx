import { AibelLogo } from "../../../assets/icons/aibel";
import { EquinorLogo } from "../../../assets/icons/equinor";

const GetCompanyLogo = (company: string) => {
  if (company === "Aibel") return AibelLogo;
  if (company === "Equinor") return EquinorLogo;
  if (company === "") return null;
};

export default GetCompanyLogo;
