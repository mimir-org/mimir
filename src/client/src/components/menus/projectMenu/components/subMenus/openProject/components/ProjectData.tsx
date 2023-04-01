import Moment from "react-moment";
// import { changeSelectedProject } from "../../../../../../../redux/store/project/actions";
import { ProjectDataBox } from "./ProjectData.styled";
import { Dispatch } from "redux";
import { projectSelector, useAppSelector } from "../../../../../../../redux/store";
import { OnOpenClick } from "../handlers/OnOpenClick";
import { ProjectItemCm } from "lib";

interface Props {
  projects: ProjectItemCm[];
  projectId: string;
  projectName: string;
  projectOwner: string;
  projectVersion: string;
  updated: Date;
  dispatch: Dispatch;
}

export const ProjectData = ({ projects, projectId, projectName, projectVersion, projectOwner, updated, dispatch }: Props) => {
  const selected = projects.find((x) => x.id === projectId).selected;
  const currentProject = useAppSelector(projectSelector);

  const handleClick = (e) => {
    // dispatch(changeSelectedProject(projectId));
    if (e.detail === 2) OnOpenClick(projectId, currentProject, dispatch);
  };

  return (
    <ProjectDataBox onClick={handleClick} selected={selected}>
      <span className="name">{projectName}</span>
      <span className="owner">{projectOwner}</span>
      <span className="version">{projectVersion}</span>
      <span className="edited">
        <Moment format="DD/MM/YYYY ">{updated}</Moment>
      </span>
    </ProjectDataBox>
  );
};

export default ProjectData;
