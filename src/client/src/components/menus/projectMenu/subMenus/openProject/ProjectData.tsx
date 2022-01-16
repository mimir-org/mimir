import Moment from "react-moment";
import { changeSelectedProject } from "../../../../../redux/store/project/actions";
import { ProjectItemCm } from "../../../../../models";
import { ProjectDataBox } from "./styled";
import { Dispatch } from "redux";

interface Props {
  projects: ProjectItemCm[];
  projectId: string;
  projectName: string;
  projectOwner: string;
  projectVersion: string;
  updated: Date;
  dispatch: Dispatch;
}

export const ProjectDataComponent = ({
  projects,
  projectId,
  projectName,
  projectVersion,
  projectOwner,
  updated,
  dispatch,
}: Props) => {
  const isSelected = projects.find((x) => x.id === projectId).selected;
  const onClick = () => dispatch(changeSelectedProject(projectId));

  return (
    <ProjectDataBox onClick={onClick} isSelected={isSelected}>
      <p className="name">{projectName}</p>
      <p className="owner">{projectOwner}</p>
      <p className="version">{projectVersion}</p>
      <p className="edited">
        <Moment format="DD/MM/YYYY ">{updated}</Moment>
      </p>
    </ProjectDataBox>
  );
};

export default ProjectDataComponent;
