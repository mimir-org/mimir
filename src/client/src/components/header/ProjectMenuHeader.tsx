import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../assets/icons/chevron";
import { TextResources } from "../../assets/text";
import { OnProject } from "./handlers";
import { ProjectHeaderButton } from "./styled";
import { Project } from "../../models";
import { Dispatch } from "redux";
import { Icon } from "../../compLibrary/icon";

interface Props {
  projectMenuOpen: boolean;
  project: Project;
  dispatch: Dispatch;
}
/**
 * Component for the ProjectMenu element in the header of Mimir.
 * @param interface
 * @returns a clickable element that toggles the ProjectMenuComponent.
 */
const ProjectMenuHeader = ({ projectMenuOpen, project, dispatch }: Props) => (
  <ProjectHeaderButton isOpen={projectMenuOpen} onClick={() => OnProject(dispatch, projectMenuOpen)}>
    <span>{project?.name ?? TextResources.Project}</span>
    <Icon size={10} src={projectMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="" />
  </ProjectHeaderButton>
);
export default ProjectMenuHeader;
