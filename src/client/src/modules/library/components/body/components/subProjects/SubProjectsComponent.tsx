import { TextResources } from "../../../../../../assets/text/TextResources";
import { SubProjectsText, SubProjectsWrapper } from "./SubProjectsComponent.styled";

export const SubProjectsComponent = () => (
  <SubProjectsWrapper>
    <SubProjectsText>{TextResources.SUBPROJECTS_INFO}</SubProjectsText>
    <SubProjectsText>{TextResources.SUBPROJECTS_NONE}</SubProjectsText>
  </SubProjectsWrapper>
);
