import { useState } from "react";
import { useDispatch } from "react-redux";
import { create, get } from "../../redux/store/project/actions";

import GetImg from "./helpers/GetImg";
import textResources from "../../textResources";
import { EarlierProjectComponent } from "../project/earlierProjectComponent";

export const ProjectOptions = () => {
  const dispatch = useDispatch();

  const [newImgHover, setNewImgHover] = useState(false);
  const [earlierImgHover, setEarlierImgHover] = useState(false);
  const [earlierProjectComponent, setEarlierProjectComponent] = useState(false);

  return (
    <div className="project_options_wrapper">
      {earlierProjectComponent ? (
        <EarlierProjectComponent />
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
                setEarlierImgHover(true);
              }}
              onMouseOut={() => {
                setEarlierImgHover(false);
              }}
              //   onClick={() => dispatch(get("95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C"))}
              onClick={() => setEarlierProjectComponent(true)}
            >
              <GetImg icon="OpenProjectIcon" />
              <p className="option_text">
                {textResources.Project_open_project}
              </p>
              {earlierImgHover ? (
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
