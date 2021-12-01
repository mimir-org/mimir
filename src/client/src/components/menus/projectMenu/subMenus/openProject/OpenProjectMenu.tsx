import * as Click from "../../handlers";
import { SearchBar, ProjectList, ProjectDescription } from "./";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { Button } from "../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../assets/text";
import { ProjectSimple } from "../../../../../models";
import { ProjectState } from "../../../../../redux/store/project/types";
import { OnOpen, OnReturn } from "./handlers";
import { RightArrowIcon } from "../../../../../assets/icons/arrow";
import { ProjectListLabels } from "./styled";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ProjectDetails,
  SearchProject,
  RightContainer,
  ButtonsContainer,
  OpenButton,
} from "../styled";

interface Props {
  projectState: ProjectState;
  dispatch: any;
}

export const OpenProjectMenu = ({ projectState, dispatch }: Props) => {
  const projects = projectState.projectList as ProjectSimple[];
  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;
  const projectDescription = project?.description;
  const hasProject = projectId && projectId !== "";
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);

  return (
    <ProjectBox large visible={isOpen}>
      <ProjectBody large>
        <HeaderBox>{TextResources.Project_Open_Label}</HeaderBox>
        <ProjectDetails>
          <SearchProject>
            <SearchBar />
            <ProjectList projectList={projects} />
          </SearchProject>
          <RightContainer>
            <Button onClick={() => Click.OnCreate(dispatch)} text={TextResources.Project_Start_Label} />
            <ProjectDescription description={projectDescription} />
          </RightContainer>
        </ProjectDetails>
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
