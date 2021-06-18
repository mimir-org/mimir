import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedProject } from "../../../redux/store/project/actions";
import { RootState } from "../../../redux/store";
import { ProjectSimple } from "../../../models";
import "./projectdata.scss";

interface Props {
  projectId: string;
  projectName: string;
  projectOwner: string;
  updated: Date;
}

export const ProjectDataComponent = ({
  projectId,
  projectName,
  projectOwner,
  updated,
}: Props) => {
  const dispatch = useDispatch();
  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];
  const isSelected = projects.find((x) => x.id === projectId).selected;

  const handleClick = () => {
    dispatch(changeSelectedProject(projectId));
  };

  return (
    <div
      className={
        "project_data " + (isSelected ? "selected_project" : "not_selected")
      }
      onClick={handleClick}
    >
      <p className="project_name">{projectName}</p>
      <p className="project_owner">{projectOwner}</p>
      <p className="last_edited">
        <Moment format="DD/MM/YY h:mm A">{updated}</Moment>
      </p>
    </div>
  );
};

export default ProjectDataComponent;
