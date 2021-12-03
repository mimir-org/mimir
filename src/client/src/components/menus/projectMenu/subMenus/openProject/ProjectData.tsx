import Moment from "react-moment";
import { changeSelectedProject } from "../../../../../redux/store/project/actions";
import { ProjectSimple } from "../../../../../models";
import { useAppDispatch } from "../../../../../redux/store";
import { ProjectDataBox } from "./styled";
import { RadioButton } from "../../../../../compLibrary/input/radiobutton";

interface Props {
  projects: ProjectSimple[];
  projectId: string;
  projectName: string;
  projectOwner: string;
  projectVersion: string;
  updated: Date;
}

export const ProjectDataComponent = ({ projects, projectId, projectName, projectVersion, projectOwner, updated }: Props) => {
  const dispatch = useAppDispatch();
  const isSelected = projects.find((x) => x.id === projectId).selected;
  const onClick = () => dispatch(changeSelectedProject(projectId));

  return (
    <ProjectDataBox onClick={onClick} isSelected={isSelected}>
      <RadioButton isChecked={isSelected} onChange={onClick} id={projectId} />
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
