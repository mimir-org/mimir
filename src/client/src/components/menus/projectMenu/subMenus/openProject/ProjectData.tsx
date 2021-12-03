import Moment from "react-moment";
import { changeSelectedProject } from "../../../../../redux/store/project/actions";
import { ProjectItemCm } from "../../../../../models";
import { useAppDispatch } from "../../../../../redux/store";
import { ProjectDataBox } from "./styled";

interface Props {
  projects: ProjectItemCm[];
  projectId: string;
  projectName: string;
  projectOwner: string;
  updated: Date;
}

export const ProjectDataComponent = ({ projects, projectId, projectName, projectOwner, updated }: Props) => {
  const dispatch = useAppDispatch();
  const isSelected = projects.find((x) => x.id === projectId).selected;
  const onClick = () => dispatch(changeSelectedProject(projectId));

  return (
    <ProjectDataBox onClick={onClick} isSelected={isSelected}>
      <div className="name">{projectName}</div>
      <div className="owner">{projectOwner}</div>
      <div className="edited">
        <Moment format="DD/MM/YY h:mm A">{updated}</Moment>
      </div>
    </ProjectDataBox>
  );
};

export default ProjectDataComponent;
