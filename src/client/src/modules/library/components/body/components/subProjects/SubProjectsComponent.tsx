import { TextResources } from "../../../../../../assets/text/TextResources";
import { SubProjectsText, SubProjectsWrapper } from "./SubProjectsComponent.styled";

export const SubProjectsComponent = () => (
  <SubProjectsWrapper>
    <SubProjectsText>{TextResources.LIBRARY_SUBPROJECTS_INFO}</SubProjectsText>
    <SubProjectsText>{TextResources.LIBRARY_SUBPROJECTS_NONE}</SubProjectsText>
  </SubProjectsWrapper>
);
