import { TextResources } from "../../../../../../assets/text/TextResources";
import { SubProjectsText, SubProjectsWrapper } from "./SubProjectsComponent.styled";

export const SubProjectsComponent = () => (
  <SubProjectsWrapper>
    <SubProjectsText>{TextResources.Library_Subprojects_Info}</SubProjectsText>
    <SubProjectsText>{TextResources.Library_Subprojects_None}</SubProjectsText>
  </SubProjectsWrapper>
);
