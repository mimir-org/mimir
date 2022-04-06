import { AibelLogo } from "../assets/icons/aibel/inspector";
import { EquinorLogo } from "../assets/icons/equinor/inspector";
import { InspectorElement } from "../modules/inspector/types";
import { IsCreateLibraryType } from "../modules/inspector/helpers/IsType";

const GetCompanyLogoForInspector = (company: string, elem: InspectorElement) => {
  let companyValue = company;

  if (IsCreateLibraryType(elem)) return null;
  else if (elem.domain) companyValue = elem.domain;

  if (companyValue === "aibel.com") return AibelLogo;
  if (companyValue === "equinor.com") return EquinorLogo;
  return null;
};

export default GetCompanyLogoForInspector;
