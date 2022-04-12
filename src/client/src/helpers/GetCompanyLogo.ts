import { Node } from "../models";
import { AibelLogo } from "../assets/icons/aibel/nodes";
import { EquinorLogo } from "../assets/icons/equinor/nodes";
import { AibelInvertedLogo } from "../assets/icons/aibel/inspector";
import { EquinorInvertedLogo } from "../assets/icons/equinor/inspector";
import { InspectorElement } from "../modules/inspector/types";
import { IsCreateLibraryType } from "../modules/inspector/helpers/IsType";

export const GetCompanyLogoForNode = (company: string, node: Node) => {
  let companyValue = company;

  if (node.domain) companyValue = node.domain;
  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  return null;
};

export const GetCompanyLogoForInspector = (company: string, elem: InspectorElement) => {
  let companyValue = company;

  if (IsCreateLibraryType(elem)) return null;
  else if (elem.domain) companyValue = elem.domain;

  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  return null;
};

export const GetCompanyLogoForHeader = (company: string) => {
  if (company === "aibel.com") return AibelInvertedLogo;
  if (company === "equinor.com") return EquinorInvertedLogo;
  return null;
};
