import { SearchBar, ProjectList } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MENU_TYPE } from "../../../models/project";
import { CloseIcon, RightArrowIcon } from "../../../assets/icons/common";
import { MenuButton } from "../../../compLibrary/buttons";
import { TextResources } from "../../../assets/text";
import { get } from "../../../redux/store/project/actions";
import { changeMenu } from "../../../redux/store/projectMenu/actions";
import { useState } from "react";
import { MessageComponent } from "../../message";
import { ProjectSimple } from "../../../models";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../compLibrary/box/project";

export const OpenProjectMenu = () => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);

  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;

  const isOpen = useSelector<RootState>(
    (state) =>
      state.menu.list.find((x) => x.type === MENU_TYPE.OPEN_PROJECT_MENU)
        ?.visible
  ) as boolean;

  const onReturnClick = () => {
    dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, false));
  };

  const onOpenClick = () => {
    setConfirm(true);
    dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, false));
  };

  const onSaveClick = () => {
    dispatch(get(projectId));
    setConfirm(false);
    dispatch(get(projectId));
    // dispatch(save(currentProject));
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
  };

  const onNoSaveClick = () => {
    dispatch(get(projectId));
    setConfirm(false);
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
  };

  return (
    <>
      <ProjectBox visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img
              src={CloseIcon}
              alt="icon"
              onClick={onReturnClick}
              className="icon"
            />
            {TextResources.Account_Open_Label}
          </HeaderBox>
          <SearchBar />
          <ProjectList />
          <ButtonBox>
            {projectId && (
              <MenuButton onClick={onOpenClick} wide>
                <p>{TextResources.Project_recent_open}</p>
                <img src={RightArrowIcon} alt="icon" className="icon" />
              </MenuButton>
            )}
          </ButtonBox>
        </ProjectBody>
      </ProjectBox>
      {confirm && (
        <MessageComponent
          handleSave={onSaveClick}
          handleNoSave={onNoSaveClick}
        />
      )}
    </>
  );
};

export default OpenProjectMenu;
