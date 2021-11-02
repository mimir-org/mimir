import { AibelLogo } from "../../../assets/icons/aibel";
import { EquinorLogo } from "../../../assets/icons/equinor";
import { Node } from "../../../models";

const GetCompanyLogo = (company: string, node: Node) => {
  let companyValue = company;

  const split = node?.id.split("_");
  if (split && split.length === 2) {
    companyValue = split[0];
  }

  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  if (companyValue === "") return null;
};

export default GetCompanyLogo;
