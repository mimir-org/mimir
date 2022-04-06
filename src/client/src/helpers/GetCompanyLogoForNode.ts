import { AibelLogo } from "../assets/icons/aibel/nodes";
import { EquinorLogo } from "../assets/icons/equinor/nodes";
import { Node } from "../models";

const GetCompanyLogoForNode = (company: string, node: Node) => {
  let companyValue = company;

  if (node.domain) companyValue = node.domain;
  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  return null;
};

export default GetCompanyLogoForNode;
