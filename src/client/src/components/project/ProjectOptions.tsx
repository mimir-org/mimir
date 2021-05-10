import { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../../redux/store/project/actions";
import { TextResources } from "../../assets/textResources";
import { OpenProjectComponent } from "./openProjectComponent";
import { NewProjectIcon, OpenProjectIcon } from "../../assets/icons";
import {
  ProjectBody,
  ProjectBox,
  ProjectElement,
} from "../../componentLibrary/box/project";

export const ProjectOptions = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    dispatch(create("unnamed", "unnamed"));
  };

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen ? (
        <ProjectBox>
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
      ) : (
        <div style={{ zIndex: 100 }}>
          <OpenProjectComponent visible={true} />
        </div>
      )}
    </>
  );
};

export default ProjectOptions;
