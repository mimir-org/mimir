import { useDispatch, useSelector } from "react-redux";
import { create } from "../../redux/store/project/actions";
import { TextResources } from "../../assets/text";
import { RootState } from "../../redux/store";
import { NewProjectIcon, OpenProjectIcon } from "../../assets/icons/common";
import { changeMenu } from "../../redux/store/projectMenu/actions";
import { MENU_TYPE } from "../../models/project";
import {
  ProjectBody,
  ProjectBox,
  ProjectElement,
} from "../../compLibrary/box/project";

export const ProjectMainMenu = () => {
  const dispatch = useDispatch();

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  ) as boolean;

  const isOpen = useSelector<RootState>(
    (state) =>
      state.menu.list.find((x) => x.type === MENU_TYPE.MAIN_MENU).visible
  ) as boolean;

  const handleCreateClick = () => {
    dispatch(create("unnamed", "unnamed"));
    dispatch(changeMenu(MENU_TYPE.MAIN_MENU, false));
  };

  const handleOpenClick = () => {
    dispatch(changeMenu("mainMenu", false));
    dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, true));
    dispatch(changeMenu(MENU_TYPE.MAIN_MENU, false));
  };

  return (
    !hasProject && (
      <ProjectBox visible={isOpen} small>
        <ProjectBody>
          <p>{TextResources.Project_heading}</p>
          <ProjectElement onClick={handleCreateClick}>
            <img src={NewProjectIcon} alt="icon" className="icon" />
            <p>{TextResources.Project_new_project}</p>
          </ProjectElement>
          <ProjectElement onClick={handleOpenClick}>
            <img src={OpenProjectIcon} alt="icon" className="icon" />
            <p>{TextResources.Project_open_project}</p>
          </ProjectElement>
        </ProjectBody>
      </ProjectBox>
    )
  );
};

export default ProjectMainMenu;
