import { useState } from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";

interface ProjectDataComponentProps {
  projectId: String;
  projectName: String;
  projectOwner: String;
  lastEdited: Date;
  selected: boolean;
}

export const ProjectDataComponent = ({
  projectId,
  projectName,
  projectOwner,
  lastEdited,
  selected,
}: ProjectDataComponentProps) => {
  const handleClick = () => {};
  return (
    <div
      className={
        "project_data " + (selected ? "selected_project" : "not_selected")
      }
      onClick={handleClick}
    >
      <p className="project_name">{projectName}</p>
      <p className="project_owner">{projectOwner}</p>
      <p className="last_edited">
        <Moment format="DD/MM/YY h:mm A">{lastEdited}</Moment>
      </p>
    </div>
  );
};

export default ProjectDataComponent;
