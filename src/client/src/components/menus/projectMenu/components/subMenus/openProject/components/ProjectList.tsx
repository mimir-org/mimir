import { ProjectData } from "./ProjectData";
import { Dispatch } from "redux";
import { ProjectItemCm } from "../../../../../../../lib/models";
import { ProjectDataContainer, ProjectListBox, ProjectListLabels } from "./ProjectList.styled";
import { TextResources } from "../../../../../../../assets/text/TextResources";

interface Props {
  projectList: ProjectItemCm[];
  dispatch: Dispatch;
}

export const ProjectList = ({ projectList, dispatch }: Props) => (
  <ProjectListBox>
    <ProjectListLabels>
      <p className="name">{TextResources.PROJECT}</p>
      <p className="owner">{TextResources.OWNER}</p>
      <p className="version">{TextResources.VERSION}</p>
      <p className="edited">{TextResources.EDITED}</p>
    </ProjectListLabels>
    <ProjectDataContainer>
      {projectList?.map((project) => {
        return (
          <ProjectData
            key={project.id}
            projects={projectList}
            projectId={project.id}
            projectName={project.name}
            projectOwner={project.projectOwner}
            projectVersion={project.version}
            updated={project.updated}
            dispatch={dispatch}
          />
        );
      })}
    </ProjectDataContainer>
  </ProjectListBox>
);

export default ProjectList;
