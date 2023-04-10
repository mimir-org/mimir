import { TextResources } from "../../../assets/text/TextResources";
import { ProjectDescriptionBody, ProjectDescriptionBox } from "./Project.styled";

interface ProjectDescription {
  description: string;
}

export const ProjectDescription = ({ description }: ProjectDescription) => (
  <ProjectDescriptionBox>
    <ProjectDescriptionBody>
      <p className="about">{TextResources.PROJECT_ABOUT}</p>
      <span className="text-about">{description != null ? description : TextResources.PROJECT_NA}</span>
      <p className="libraries">{TextResources.PROJECT_LIB}</p>
      <p className="sub-proj">{TextResources.SUBPROJECTS}</p>
      <p className="templates">{TextResources.TEMPLATES}</p>
    </ProjectDescriptionBody>
  </ProjectDescriptionBox>
);

export default ProjectDescription;
