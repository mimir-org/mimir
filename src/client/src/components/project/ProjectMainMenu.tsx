import { useDispatch, useSelector } from "react-redux";
import { create } from "../../redux/store/project/actions";
import { TextResources } from "../../assets/textResources";
import { RootState } from "../../redux/store";
import { NewProjectIcon, OpenProjectIcon } from "../../assets/icons";
import { changeProjectMenu } from "../../redux/store/projectMenu/actions";
import {
  ProjectBody,
  ProjectBox,
  ProjectElement,
} from "../../componentLibrary/box/project";

export const ProjectMainMenu = () => {
  const dispatch = useDispatch();

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  ) as boolean;

  const isOpen = useSelector<RootState>(
    (state) =>
      state.projectMenu.menu.find((x) => x.type === "optionsMenu").visible
  ) as boolean;

  const handleClick = () => {
    dispatch(create("unnamed", "unnamed"));
  };

  const handleOpenClick = () => {
    dispatch(changeProjectMenu("optionsMenu", false));
    dispatch(changeProjectMenu("openProjectMenu", true));
  };

  return (
    !hasProject && (
      <ProjectBox visible={isOpen} small>
        <ProjectBody>
          <p>{TextResources.Project_heading}</p>
          <ProjectElement onClick={handleClick}>
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
