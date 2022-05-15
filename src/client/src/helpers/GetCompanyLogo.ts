import { Node } from "../models";
import { AibelLogo } from "../assets/icons/aibel/nodes";
import { EquinorLogo } from "../assets/icons/equinor/nodes";
import { AibelInvertedLogo } from "../assets/icons/aibel/inspector";
import { EquinorInvertedLogo } from "../assets/icons/equinor/inspector";
import { InspectorElement } from "../modules/inspector/types";
import { TextResources } from "../assets/text/TextResources";

export const GetCompanyLogoForNode = (company: string, node: Node) => {
  let companyValue = company;

  if (node.domain) companyValue = node.domain;
  if (companyValue === TextResources.AIBEL) return AibelLogo;
  if (companyValue === TextResources.EQUINOR) return EquinorLogo;
  return null;
};

export const GetCompanyLogoForInspector = (company: string, elem: InspectorElement) => {
  let companyValue = company;

  if (elem.domain) companyValue = elem.domain;

  if (companyValue === TextResources.AIBEL) return AibelLogo;
  if (companyValue === TextResources.EQUINOR) return EquinorLogo;
  return null;
};

export const GetCompanyLogoForHeader = (company: string) => {
  if (company === TextResources.AIBEL) return AibelInvertedLogo;
  if (company === TextResources.EQUINOR) return EquinorInvertedLogo;
  return null;
};
