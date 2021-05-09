import { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../../redux/store/project/actions";
import { GetIcon } from "./helpers";
import { TextResources } from "../../assets/textResources";
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
            <p className="options_header">{TextResources.Project_heading}</p>
            <div
              className="option_container"
              onMouseOver={() => {
                setNewImgHover(true);
              }}
              onMouseOut={() => {
                setNewImgHover(false);
              }}
              onClick={() => dispatch(create("unnamed", "unnamed"))}
            >
              <GetIcon icon="NewProjectIcon" />
              <p className="option_text">{TextResources.Project_new_project}</p>
              {newImgHover ? (
                <GetIcon icon="WhiteRightArrowIcon" />
              ) : (
                <GetIcon icon="" />
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
              <GetIcon icon="OpenProjectIcon" />
              <p className="option_text">
                {TextResources.Project_open_project}
              </p>
              {openImgHover ? (
                <GetIcon icon="WhiteRightArrowIcon" />
              ) : (
                <GetIcon icon="" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectOptions;
