import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../assets/icons/chevron";
import { TextResources } from "../../assets/text";
import { OnProject } from "./handlers";
import { ProjectBox } from "./styled";
import { Project } from "../../models";

interface Props {
  projectMenuOpen: boolean;
  project: Project;
  dispatch: any;
}
/**
 * Component for the ProjectMenu element in the header of Mimir.
 * @param interface
 * @returns a clickable element that toggles the ProjectMenuComponent.
 */
const ProjectMenu = ({ projectMenuOpen, project, dispatch }: Props) => (
  <ProjectBox isOpen={projectMenuOpen} onClick={() => OnProject(dispatch, projectMenuOpen)}>
    <p className="project-name">{project?.name ?? TextResources.Project}</p>
    <img
      src={projectMenuOpen ? ExpandWhiteIcon : CollapseWhiteIcon}
      alt="icon"
      className="toggle-icon"
      onClick={() => OnProject(dispatch, projectMenuOpen)}
    />
  </ProjectBox>
);
export default ProjectMenu;
