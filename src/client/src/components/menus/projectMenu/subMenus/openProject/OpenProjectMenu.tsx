import { Dispatch } from "redux";
import { flowViewSelector, isActiveMenuSelector, useAppSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE, ViewType, VIEW_TYPE } from "../../../../../models/project";
import { Button } from "../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../assets/text";
import { ProjectSimple } from "../../../../../models";
import { ProjectState } from "../../../../../redux/store/project/types";
import { OnOpen, OnReturn } from "./handlers";
import { RightArrowIcon } from "../../../../../assets/icons/arrow";
import { ProjectDetails } from ".";
import { ProjectBody, ProjectBox, HeaderBox, ButtonsContainer, OpenButton } from "../styled";

interface Props {
  projectState: ProjectState;
  dispatch: Dispatch;
}

/**
 * Open project menu component
 * @returns a menu for selecting a project or create a new one.
 */

export const OpenProjectMenu = ({ projectState, dispatch }: Props) => {
  const projects = projectState.projectList as ProjectSimple[];
  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;
  const projectDescription = project?.description;
  const hasProject = projectId && projectId !== "";
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);
  const flowView = useAppSelector(flowViewSelector);
  const startPageOpen = flowView === (VIEW_TYPE.STARTPAGE as ViewType);

  return (
    <ProjectBox large visible={isOpen} startPage={startPageOpen}>
      <ProjectBody large>
        <HeaderBox>{TextResources.Project_Open_Label}</HeaderBox>
        <ProjectDetails projects={projects} projectDescription={projectDescription} dispatch={dispatch} />
        <ButtonsContainer>
          <Button onClick={() => OnReturn(dispatch)} text={TextResources.Project_Cancel} />
          <OpenButton hasProject={hasProject}>
            <Button
              onClick={hasProject ? () => OnOpen(projectId, dispatch) : () => null}
              text={TextResources.Project_Open}
              icon={RightArrowIcon}
            />
          </OpenButton>
        </ButtonsContainer>
      </ProjectBody>
    </ProjectBox>
  );
};

export default OpenProjectMenu;
