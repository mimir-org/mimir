import { AibelLogo, AibelInvertedLogo } from "../assets/icons/aibel/nodes";
import { EquinorLogo, EquinorInvertedLogo } from "../assets/icons/equinor/nodes";
import { IsLocation, IsProduct } from ".";
import { Node } from "../models";

const GetCompanyLogoForNode = (company: string, node: Node, parent: boolean) => {
  let companyValue = company;

  const split = node?.id.split("_");
  if (split && split.length === 2) companyValue = split[0];

  if (IsLocation(node) && !node.isRoot && !parent && companyValue === "equinor.com") return EquinorInvertedLogo;
  if (IsProduct(node) && !node.isRoot && !parent && companyValue === "aibel.com") return AibelInvertedLogo;

  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  return null;
};

export default GetCompanyLogoForNode;
