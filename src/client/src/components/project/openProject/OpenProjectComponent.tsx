import { SearchBar } from "./SearchBar";
import { ProjectList } from "./ProjectList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectSimple } from "../../../models/project";
import { LeftArrowIcon, RightArrowIcon } from "../../../assets/icons";
import { MenuButton } from "../../../componentLibrary/buttons";
import { TextResources } from "../../../assets/textResources";
import { SetProject } from "../../../redux/store/localStorage/localStorage";
import { get } from "../../../redux/store/project/actions";
import { ProjectBody, ProjectBox } from "../../../componentLibrary/box/project";
import CustomBox from "../../../componentLibrary/box/CustomBox";
import CustomBox2 from "../../../componentLibrary/box/CustomBox2";
import { changeProjectMenu } from "../../../redux/store/projectMenu/actions";

export const OpenProjectComponent = () => {
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
    dispatch(changeProjectMenu("optionsMenu", false));
  };

  const handleOpenClick = () => {
    SetProject(projectId); // LocalStorage update
    dispatch(get(projectId)); // Redux update
    dispatch(changeProjectMenu("openProjectMenu", false));
  };

  const project =
    projects !== null ? projects.find((x) => x.selected === true) : undefined;
  const projectId = project ? project.id : undefined;
  console.log({ projectId });

  return (
    projectId === undefined && (
      <ProjectBox visible={!isOpen}>
        <ProjectBody>
          <CustomBox>
            <img
              src={LeftArrowIcon}
              alt="icon"
              onClick={handleClick}
              className="icon"
            />
            {TextResources.Account_Open_Label}
          </CustomBox>
          <SearchBar />
          <ProjectList />
          <CustomBox2>
            {projectId && (
              <MenuButton onClick={handleOpenClick} wide>
                <p>{TextResources.Project_recent_open}</p>
                <img src={RightArrowIcon} alt="icon" className="icon" />
              </MenuButton>
            )}
          </CustomBox2>
        </ProjectBody>
      </ProjectBox>
    )
  );
};

export default OpenProjectComponent;
