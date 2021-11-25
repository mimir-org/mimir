import { ProjectData } from "./";
import { ProjectSimple } from "../../../../../models";
import { ProjectListBox } from "./styled";

interface Props {
  projectList: ProjectSimple[];
}

export const ProjectList = ({ projectList }: Props) => (
  <ProjectListBox>
    {projectList?.map((project) => {
      return (
        <ProjectData
          key={project.id}
          projects={projectList}
          projectId={project.id}
          projectName={project.name}
          projectOwner={project.projectOwner}
          updated={project.updated}
        />
      );
    })}
  </ProjectListBox>
);

export default ProjectList;
