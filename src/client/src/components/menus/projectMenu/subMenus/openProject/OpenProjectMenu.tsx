import * as Click from "./handlers";
import { SearchBar, ProjectList } from "./";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { Button } from "../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../assets/text";
import { ProjectItemCm } from "../../../../../models";
import { ProjectState } from "../../../../../redux/store/project/types";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { RightArrowIcon } from "../../../../../assets/icons/arrow";
import { ProjectListLabels } from "./styled";

interface Props {
  projectState: ProjectState;
  dispatch: any;
}

export const OpenProjectMenu = ({ projectState, dispatch }: Props) => {
  const projects = projectState.projectList as ProjectItemCm[];
  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);

  return (
    <ProjectBox large visible={isOpen}>
      <ProjectBody large>
        <HeaderBox>
          <img src={CloseIcon} alt="icon" onClick={() => Click.OnReturn(dispatch)} className="icon" />
          {TextResources.Project_OpenProject}
        </HeaderBox>
        <SearchBar />
        <div className="subheader">{TextResources.Project_Recent}</div>
        <ProjectListLabels>
          <div className="name">{TextResources.Project_Recent_Name}</div>
          <div className="owner">{TextResources.Project_Recent_Owner}</div>
          <div className="edited">{TextResources.Project_Recent_Edited}</div>
        </ProjectListLabels>
        <ProjectList projectList={projects} />
        <ButtonBox large>
          {projectId && (
            <Button onClick={() => Click.OnNoSave(dispatch, projectId)} text={TextResources.Project_Open} icon={RightArrowIcon} />
          )}
        </ButtonBox>
      </ProjectBody>
    </ProjectBox>
  );
};

export default OpenProjectMenu;
