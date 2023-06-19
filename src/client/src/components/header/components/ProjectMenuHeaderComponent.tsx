import { useState } from "react";
import { InstructionBoxComponent } from "./InstructionBoxComponent";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../assets/text/TextResources";
import { Icon } from "../../../compLibrary/icon/Icon";
import { ProjectMenuComponent } from "../../menus/projectMenu";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../../assets/icons/chevron";
import { ProjectHeaderButtonContainer, ProjectHeaderButton } from "./ProjectMenuHeaderComponent.styled";
import { DialogType } from "lib";

interface ProjectMenuHeaderComponentProps {
  projectName: string;
  isSubProject: boolean;
  hasActiveProject: boolean;
  hasSelectedNodes: boolean;
  onOpenClick: (dialogType: DialogType) => void;
}

/**
 * Component for the ProjectMenu element in the header of Mimir.
 * @returns a clickable element that toggles the ProjectMenuComponent.
 */
export const ProjectMenuHeaderComponent = ({
  projectName,
  isSubProject,
  hasActiveProject,
  hasSelectedNodes,
  onOpenClick,
}: ProjectMenuHeaderComponentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <ProjectHeaderButtonContainer>
        <Tooltip content={TextResources.PROJECT_DESCRIPTION} placement={"bottom"} offset={[0, 8]}>
          <ProjectHeaderButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span>{projectName ?? TextResources.PROJECT}</span>
            <Icon size={10} src={isMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="" />
          </ProjectHeaderButton>
        </Tooltip>
        {isMenuOpen && (
          <ProjectMenuComponent
            setIsMenuOpen={() => null}
            onOpenClick={onOpenClick}
            isSubProject={isSubProject}
            hasActiveProject={hasActiveProject}
            hasSelectedNodes={hasSelectedNodes}
          />
        )}
        {projectName == null && !isMenuOpen && <InstructionBoxComponent />}
      </ProjectHeaderButtonContainer>
    </>
  );
};
