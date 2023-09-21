import { useRef, useState } from "react";
import { InstructionBoxComponent } from "./InstructionBoxComponent";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../assets/text/TextResources";
import { ProjectMenuComponent } from "../../menus/projectMenu";
import { CollapseWhiteIcon, ExpandedWhiteIcon } from "@mimirorg/component-library";
import { ProjectHeaderButtonContainer, ProjectHeaderButton } from "./ProjectMenuHeaderComponent.styled";
import { DialogType } from "lib";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

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
  const ref = useRef(null);
  useOutsideClick(ref, () => setIsMenuOpen(false));

  return (
    <>
      <ProjectHeaderButtonContainer ref={ref}>
        <Tooltip content={TextResources.PROJECT_DESCRIPTION} placement={"bottom"} offset={[0, 8]}>
          <ProjectHeaderButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(true)}>
            <span>{projectName ?? TextResources.PROJECT}</span>
            {isMenuOpen ? <CollapseWhiteIcon size={10} /> : <ExpandedWhiteIcon size={10} />}
          </ProjectHeaderButton>
        </Tooltip>
        {isMenuOpen && (
          <ProjectMenuComponent
            setIsMenuOpen={setIsMenuOpen}
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
