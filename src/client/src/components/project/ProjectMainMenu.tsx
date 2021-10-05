import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../assets/text";
import { RootState } from "../../redux/store";
import { NewProject, OpenProject } from "../../assets/icons/common/project";
import { MENU_TYPE } from "../../models/project";
import { Project } from "../../models";
import { OnCreateClick, OnOpenClick } from "./handlers";
import { ProjectBody, ProjectBox, ProjectElement } from "../../compLibrary/box/project";

interface Props {
  project: Project;
}

export const ProjectMainMenu = ({ project }: Props) => {
  const dispatch = useDispatch();
  const hasProject = project !== null;

  const isOpen = useSelector<RootState>(
    (state) => state.menu.list.find((x) => x.type === MENU_TYPE.MAIN_MENU).visible
  ) as boolean;

  return (
    !hasProject && (
      <ProjectBox visible={isOpen} small>
        <ProjectBody>
          <p>{TextResources.Project_heading}</p>
          <ProjectElement onClick={() => OnCreateClick(dispatch)}>
            <img src={NewProject} alt="icon" className="icon" />
            <p>{TextResources.Project_new_project}</p>
          </ProjectElement>
          <ProjectElement onClick={() => OnOpenClick(dispatch)}>
            <img src={OpenProject} alt="icon" className="icon" />
            <p>{TextResources.Project_open_project}</p>
          </ProjectElement>
        </ProjectBody>
      </ProjectBox>
    )
  );
};

export default ProjectMainMenu;
