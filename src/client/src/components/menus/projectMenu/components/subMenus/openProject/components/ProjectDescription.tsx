import { TextResources } from "../../../../../../../assets/text/TextResources";
import { ProjectDescriptionBody, ProjectDescriptionBox } from "./ProjectDescription.styled";

export const ProjectDescription = () => (
  <ProjectDescriptionBox>
    <ProjectDescriptionBody>
      <p className="about">{TextResources.PROJECT_DESC_ABOUT}</p>
      <span className="text-about">{TextResources.PROJECT_DESC_NA}</span>
      <p className="libraries">{TextResources.PROJECT_DESC_LIB}</p>
      <p className="sub-proj">{TextResources.PROJECT_DESC_SUB_PROJ}</p>
      <p className="templates">{TextResources.PROJECT_DESC_TEMPS}</p>
    </ProjectDescriptionBody>
  </ProjectDescriptionBox>
);

export default ProjectDescription;
