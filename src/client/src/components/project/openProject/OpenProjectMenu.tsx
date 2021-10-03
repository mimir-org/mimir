import * as Handlers from "./handlers";
import { SearchBar, ProjectList } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MENU_TYPE } from "../../../models/project";
import { CloseIcon } from "../../../assets/icons/common";
import { Button } from "../../../compLibrary/buttons";
import { TextResources } from "../../../assets/text";
import { useState } from "react";
import { MessageComponent } from "../../message";
import { ProjectSimple } from "../../../models";
import { ProjectState } from "../../../redux/store/project/types";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../../../compLibrary/box/project";

interface Props {
  projectState: ProjectState;
  dispatch: any;
}

export const OpenProjectMenu = ({ projectState, dispatch }: Props) => {
  const [confirm, setConfirm] = useState(false);
  const projects = projectState.projectList as ProjectSimple[];
  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;

  const isOpen = useSelector<RootState>(
    (state) => state.menu.list.find((x) => x.type === MENU_TYPE.OPEN_PROJECT_MENU)?.visible
  ) as boolean;

  return (
    <>
      <ProjectBox visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img src={CloseIcon} alt="icon" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
            {TextResources.Account_Open_Label}
          </HeaderBox>
          <SearchBar />
          <ProjectList projectList={projects} />
          <ButtonBox>
            {projectId && <Button onClick={() => Handlers.OnOpenClick(dispatch, setConfirm)} type="Open" />}
          </ButtonBox>
        </ProjectBody>
      </ProjectBox>
      {confirm && (
        <MessageComponent
          handleSave={() => Handlers.OnSaveClick(dispatch, projectId, setConfirm)}
          handleNoSave={() => Handlers.OnNoSaveClick(dispatch, projectId, setConfirm)}
        />
      )}
    </>
  );
};

export default OpenProjectMenu;
