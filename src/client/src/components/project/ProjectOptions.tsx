import { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../../redux/store/project/actions";

import GetImg from "./helpers/GetImg";
import textResources from "../../textResources";
import { OpenProjectComponent } from "./openProjectComponent";

export const ProjectOptions = () => {
  const dispatch = useDispatch();

  const [newImgHover, setNewImgHover] = useState(false);
  const [openImgHover, setOpenImgHover] = useState(false);
  const [openProjectComponent, setOpenProjectComponent] = useState(false);

  return (
    <div className="project_options_wrapper">
      {openProjectComponent ? (
        <OpenProjectComponent />
      ) : (
        <div className="options_component_container">
          <div className="options_content">
            <p className="options_header">{textResources.Project_heading}</p>
            <div
              className="option_container"
              onMouseOver={() => {
                setNewImgHover(true);
              }}
              onMouseOut={() => {
                setNewImgHover(false);
              }}
              onClick={() => dispatch(create())}
            >
              <GetImg icon="NewProjectIcon" />
              <p className="option_text">{textResources.Project_new_project}</p>
              {newImgHover ? (
                <GetImg icon="WhiteRightArrowIcon" />
              ) : (
                <GetImg icon="" />
              )}
            </div>
            <div
              className="option_container"
              onMouseOver={() => {
                setOpenImgHover(true);
              }}
              onMouseOut={() => {
                setOpenImgHover(false);
              }}
              onClick={() => setOpenProjectComponent(true)}
            >
              <GetImg icon="OpenProjectIcon" />
              <p className="option_text">
                {textResources.Project_open_project}
              </p>
              {openImgHover ? (
                <GetImg icon="WhiteRightArrowIcon" />
              ) : (
                <GetImg icon="" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectOptions;
