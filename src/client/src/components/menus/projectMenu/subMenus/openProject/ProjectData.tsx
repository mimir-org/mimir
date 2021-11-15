import Moment from "react-moment";
import { changeSelectedProject } from "../../../../../redux/store/project/actions";
import { ProjectSimple } from "../../../../../models";
import { useAppDispatch } from "../../../../../redux/store";
import { ProjectDataBox } from "./styled";

interface Props {
  projects: ProjectSimple[];
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
      <p className="name">{projectName}</p>
      <p className="owner">{projectOwner}</p>
      <p className="edited">
        <Moment format="DD/MM/YY h:mm A">{updated}</Moment>
      </p>
    </ProjectDataBox>
  );
};

export default ProjectDataComponent;
