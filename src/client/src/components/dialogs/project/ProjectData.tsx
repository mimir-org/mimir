import Moment from "react-moment";
import { ProjectDataBox } from "./Project.styled";
import { ProjectListItem } from "./types";

interface ProjectDataProps {
  projectItem: ProjectListItem;
  onClick: (id: string) => void;
}

export const ProjectData = ({ projectItem, onClick }: ProjectDataProps) => {
  return (
    <ProjectDataBox onClick={() => onClick(projectItem.id)} selected={projectItem.selected}>
      <span className="name">{projectItem.name}</span>
      <span className="owner">{projectItem.creator}</span>
      <span className="version">{projectItem.version}</span>
      <span className="edited">
        <Moment format="DD/MM/YYYY ">{projectItem.updated}</Moment>
      </span>
    </ProjectDataBox>
  );
};

export default ProjectData;
