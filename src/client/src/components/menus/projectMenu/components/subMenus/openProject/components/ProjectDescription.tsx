import { TextResources } from "../../../../../../../assets/text/TextResources";
import { ProjectDescriptionBody, ProjectDescriptionBox } from "./ProjectDescription.styled";

export const ProjectDescription = () => (
  <ProjectDescriptionBox>
    <ProjectDescriptionBody>
      <p className="about">{TextResources.PROJECT_ABOUT}</p>
      <span className="text-about">{TextResources.PROJECT_DESC_NA}</span>
      <p className="libraries">{TextResources.PROJECT_LIB}</p>
      <p className="sub-proj">{TextResources.SUBPROJECTS}</p>
      <p className="templates">{TextResources.TEMPLATES}</p>
    </ProjectDescriptionBody>
  </ProjectDescriptionBox>
);

export default ProjectDescription;
