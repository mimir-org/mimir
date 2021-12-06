import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../assets/icons/chevron";
import { TextResources } from "../../assets/text";
import { OnProject } from "./handlers";
import { ProjectHeaderBox } from "./styled";
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
const ProjectMenuHeader = ({ projectMenuOpen, project, dispatch }: Props) => (
  <ProjectHeaderBox isOpen={projectMenuOpen} onClick={() => OnProject(dispatch, projectMenuOpen)}>
    <p>{project?.name ?? TextResources.Project}</p>
    <img
      src={projectMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon}
      alt="icon"
      className="toggle-icon"
      onClick={() => OnProject(dispatch, projectMenuOpen)}
    />
  </ProjectHeaderBox>
);
export default ProjectMenuHeader;
