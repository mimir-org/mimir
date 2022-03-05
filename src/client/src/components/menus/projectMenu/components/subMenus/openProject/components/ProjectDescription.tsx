import { TextResources } from "../../../../../../../assets/text/TextResources";
import { ProjectDescriptionBody, ProjectDescriptionBox } from "./ProjectDescription.styled";

export const ProjectDescription = () => (
  <ProjectDescriptionBox>
    <ProjectDescriptionBody>
      <p className="about">{TextResources.Project_Description_About}</p>
      <span className="text-about">{TextResources.Project_Description_Na}</span>
      <p className="libraries">{TextResources.Project_Description_Libraries}</p>
      <p className="sub-proj">{TextResources.Project_Description_SubProj}</p>
      <p className="templates">{TextResources.Project_Description_Temps}</p>
    </ProjectDescriptionBody>
  </ProjectDescriptionBox>
);

export default ProjectDescription;
