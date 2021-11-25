import * as Click from "./handlers";
import { useState } from "react";
import { SearchBar, ProjectList } from "./";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { Button } from "../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../assets/text";
import { MessageComponent } from "../../../../message";
import { ProjectSimple } from "../../../../../models";
import { ProjectState } from "../../../../../redux/store/project/types";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { RightArrowIcon } from "../../../../../assets/icons/arrow";

interface Props {
  projectState: ProjectState;
  dispatch: any;
}

export const OpenProjectMenu = ({ projectState, dispatch }: Props) => {
  const [confirm, setConfirm] = useState(false);
  const projects = projectState.projectList as ProjectSimple[];
  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);

  return (
    <>
      <ProjectBox visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img src={CloseIcon} alt="icon" onClick={() => Click.OnReturn(dispatch)} className="icon" />
            {TextResources.Project_Open_Project}
          </HeaderBox>
          <SearchBar />
          <ProjectList projectList={projects} />
          <ButtonBox>
            {projectId && <Button onClick={() => Click.OnOpen(dispatch, setConfirm)} text="Open" icon={RightArrowIcon} />}
          </ButtonBox>
        </ProjectBody>
      </ProjectBox>
      {confirm && (
        <MessageComponent
          handleSave={() => Click.OnSave(dispatch, projectId, setConfirm)}
          handleNoSave={() => Click.OnNoSave(dispatch, projectId, setConfirm)}
          showConfirm={confirm}
          setConfirm={setConfirm}
          text={TextResources.Project_Confirm_Save}
        />
      )}
    </>
  );
};

export default OpenProjectMenu;
