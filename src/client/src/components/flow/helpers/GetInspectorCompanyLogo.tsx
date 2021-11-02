import { AibelLogo } from "../../../assets/icons/aibel/inspector";
import { EquinorLogo } from "../../../assets/icons/equinor/inspector";
import { Node } from "../../../models";

const GetInspectorCompanyLogo = (company: string, node: Node) => {
  let companyValue = company;

  const split = node?.id.split("_");
  if (split && split.length === 2) companyValue = split[0];

  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  return null;
};

export default GetInspectorCompanyLogo;
