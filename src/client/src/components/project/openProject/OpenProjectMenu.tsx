import { SearchBar, ProjectList } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectSimple } from "../../../models/project";
import { LeftArrowIcon, RightArrowIcon } from "../../../assets/icons";
import { MenuButton } from "../../../componentLibrary/buttons";
import { TextResources } from "../../../assets/textResources";
import { SetProject } from "../../../redux/store/localStorage/localStorage";
import { get } from "../../../redux/store/project/actions";
import { changeProjectMenu } from "../../../redux/store/projectMenu/actions";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../componentLibrary/box/project";

export const OpenProjectMenu = () => {
  const dispatch = useDispatch();

  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  const isOpen = useSelector<RootState>(
    (state) =>
      state.projectMenu.menu.find((x) => x.type === "openProjectMenu").visible
  ) as boolean;

  const handleClick = () => {
    dispatch(changeProjectMenu("openProjectMenu", false));
    dispatch(changeProjectMenu("optionsMenu", true));
  };

  const handleOpenClick = () => {
    SetProject(projectId);
    dispatch(get(projectId));
    dispatch(changeProjectMenu("openProjectMenu", false));
  };

  const project =
    projects !== null ? projects.find((x) => x.selected === true) : undefined;
  const projectId = project ? project.id : undefined;

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img
            src={LeftArrowIcon}
            alt="icon"
            onClick={handleClick}
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
  );
};

export default OpenProjectMenu;
