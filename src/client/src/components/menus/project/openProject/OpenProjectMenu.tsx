import * as Click from "./handlers";
import { SearchBar, ProjectList } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { MENU_TYPE } from "../../../../models/project";
import { CloseIcon } from "../../../../assets/icons/close";
import { Button } from "../../../../compLibrary/buttons";
import { TextResources } from "../../../../assets/text";
import { useState } from "react";
import { MessageComponent } from "../../../message";
import { ProjectSimple } from "../../../../models";
import { ProjectState } from "../../../../redux/store/project/types";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../../../../compLibrary/box/project";

interface Props {
  projectState: ProjectState;
  dispatch: any;
}

export const OpenProjectMenu = ({ projectState, dispatch }: Props) => {
  const [confirm, setConfirm] = useState(false);
  const projects = projectState.projectList as ProjectSimple[];
  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;
  const isOpen = useSelector<RootState>((s) => s.menu.activeMenu === MENU_TYPE.OPEN_PROJECT_MENU) as boolean;

  return (
    <>
      <ProjectBox visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img src={CloseIcon} alt="icon" onClick={() => Click.OnReturn(dispatch)} className="icon" />
            {TextResources.Account_Open_Label}
          </HeaderBox>
          <SearchBar />
          <ProjectList projectList={projects} />
          <ButtonBox>{projectId && <Button onClick={() => Click.OnOpen(dispatch, setConfirm)} type="Open" />}</ButtonBox>
        </ProjectBody>
      </ProjectBox>
      {confirm && (
        <MessageComponent
          handleSave={() => Click.OnSave(dispatch, projectId, setConfirm)}
          handleNoSave={() => Click.OnNoSave(dispatch, projectId, setConfirm)}
        />
      )}
    </>
  );
};

export default OpenProjectMenu;
