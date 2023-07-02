import { ProjectData } from "./ProjectData";
import { ProjectDataContainer, ProjectListBox, ProjectListLabels } from "./Project.styled";
import { TextResources } from "assets/text/TextResources";
import { ProjectListItem } from "../../../../lib/interfaces/ProjectListItem";

interface Props {
  projectList: ProjectListItem[];
  onClick: (id: string) => void;
}

export const ProjectList = ({ projectList, onClick }: Props) => (
  <ProjectListBox>
    <ProjectListLabels>
      <p className="name">{TextResources.PROJECT}</p>
      <p className="owner">{TextResources.OWNER}</p>
      <p className="version">{TextResources.VERSION}</p>
      <p className="edited">{TextResources.EDITED}</p>
    </ProjectListLabels>
    <ProjectDataContainer>
      {projectList?.map((item) => {
        return <ProjectData key={item.id} projectItem={item} onClick={onClick} />;
      })}
    </ProjectDataContainer>
  </ProjectListBox>
);

export default ProjectList;
