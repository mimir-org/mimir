import { AibelLogo } from "../assets/icons/aibel/inspector";
import { EquinorLogo } from "../assets/icons/equinor/inspector";
import { InspectorElement } from "../modules/inspector/types";

const GetCompanyLogoForInspector = (company: string, elem: InspectorElement) => {
  let companyValue = company;

  if (elem.domain) {
    companyValue = elem.domain;
  }

  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  return null;
};

export default GetCompanyLogoForInspector;
