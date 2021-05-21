import { SearchBar, ProjectList } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Project, ProjectSimple } from "../../../models/project";
import { LeftArrowIcon, RightArrowIcon } from "../../../assets/icons";
import { MenuButton } from "../../../componentLibrary/buttons";
import { TextResources } from "../../../assets/textResources";
import { SetProjectId } from "../../../redux/store/localStorage";
import { get, save } from "../../../redux/store/project/actions";
import { changeProjectMenu } from "../../../redux/store/projectMenu/actions";
import { useState } from "react";
import { MessageComponent } from "../../message";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../componentLibrary/box/project";

export const OpenProjectMenu = () => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);

  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  const currentProject = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const project = projects?.find((x) => x.selected);
  const projectId = project?.id;

  const isOpen = useSelector<RootState>(
    (state) =>
      state.projectMenu.menu.find((x) => x.type === "openProjectMenu").visible
  ) as boolean;

  const handleReturnClick = () => {
    dispatch(changeProjectMenu("openProjectMenu", false));
  };

  const handleOpenClick = () => {
    setConfirm(true);
    dispatch(changeProjectMenu("openProjectMenu", false));
  };

  const handleSaveClick = () => {
    SetProjectId(projectId);
    dispatch(get(projectId));
    setConfirm(false);
    dispatch(get(projectId));
    // dispatch(save(currentProject));
    dispatch(changeProjectMenu("accountMenu", false));
  };

  const handleNoSaveClick = () => {
    SetProjectId(projectId);
    dispatch(get(projectId));
    setConfirm(false);
    dispatch(changeProjectMenu("accountMenu", false));
  };

  return (
    <>
      <ProjectBox visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img
              src={LeftArrowIcon}
              alt="icon"
              onClick={handleReturnClick}
              className="icon"
            />
            {TextResources.Account_Open_Label}
          </HeaderBox>
          <SearchBar />
          <ProjectList />
          <ButtonBox>
            {projectId && (
              <MenuButton onClick={handleOpenClick} wide>
                <p>{TextResources.Project_recent_open}</p>
                <img src={RightArrowIcon} alt="icon" className="icon" />
              </MenuButton>
            )}
          </ButtonBox>
        </ProjectBody>
      </ProjectBox>
      {confirm && (
        <MessageComponent
          handleSave={handleSaveClick}
          handleNoSave={handleNoSaveClick}
        />
      )}
    </>
  );
};

export default OpenProjectMenu;
