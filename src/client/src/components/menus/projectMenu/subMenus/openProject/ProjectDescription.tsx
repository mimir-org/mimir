import { TextResources } from "../../../../../assets/text";
import { ProjectDescriptionBox, ProjectDescriptionBody } from "./styled";

interface Props {
  description: string;
}

export const ProjectDescription = ({ description }: Props) => {
  return (
    <ProjectDescriptionBox>
      <ProjectDescriptionBody>
        <p className="about">{TextResources.Project_Description_About}</p>
        <span className="text-about">{description}</span>
        <p className="libraries">{TextResources.Project_Description_Libraries}</p>
        <p className="sub-proj">{TextResources.Project_Description_SubProj}</p>
        <p className="templates">{TextResources.Project_Description_Temps}</p>
      </ProjectDescriptionBody>
    </ProjectDescriptionBox>
  );
};

export default ProjectDescription;
