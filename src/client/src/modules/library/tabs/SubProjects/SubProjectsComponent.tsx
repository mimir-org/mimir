import { TextResources } from "../../../../assets/text";
import { SubProjectsWrapper } from "./SubProjectsComponent.styled";

const SubProjectsComponent = () => (
  <SubProjectsWrapper>
    <p>{TextResources.Library_Subprojects_Info}</p>
    <p>{TextResources.Library_Subprojects_None}</p>
  </SubProjectsWrapper>
);

export default SubProjectsComponent;
