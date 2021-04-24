import { useState } from "react";
import {
  NewProjectIcon,
  OpenProjectIcon,
  RightArrowIcon,
  WhiteRightArrowIcon,
} from "../../../../assets";
import textResources from "../../../../textResources";
import { EarlierProjectComponent } from "../earlierProjectComponent";

export const OptionsComponent = () => {
  const [arrowIconImgSrc, setArrowIconImgSrc] = useState(RightArrowIcon);
  const [secondArrowIconImgSrc, setSecondArrowIconImgSrc] = useState(
    RightArrowIcon
  );
  const [showEarlierProject, setshowEarlierProject] = useState(false);

  const onClickEarlierProject = () => {
    setshowEarlierProject(true);
  };

  return (
    <div className="options_component_container">
      {showEarlierProject ? (
        <EarlierProjectComponent />
      ) : (
        <div className="options_content">
          <p className="options_header">{textResources.Project_heading}</p>
          <div
            className="option_container"
            onMouseOver={() => {
              setArrowIconImgSrc(WhiteRightArrowIcon);
            }}
            onMouseOut={() => {
              setArrowIconImgSrc(RightArrowIcon);
            }}
          >
            <img
              className="option_icon"
              src={NewProjectIcon}
              alt="new-project-icon"
            />
            <p className="option_text">{textResources.Project_new_project}</p>
            <img
              className="arrow_icon"
              src={arrowIconImgSrc}
              alt="arrow-icon"
            />
          </div>
          <div
            className="option_container"
            onMouseOver={() => {
              setSecondArrowIconImgSrc(WhiteRightArrowIcon);
            }}
            onMouseOut={() => {
              setSecondArrowIconImgSrc(RightArrowIcon);
            }}
            onClick={() => onClickEarlierProject()}
          >
            <img
              className="option_icon"
              src={OpenProjectIcon}
              alt="open-project-icon"
            />
            <p className="option_text">{textResources.Project_open_project}</p>
            <img
              className="arrow_icon"
              src={secondArrowIconImgSrc}
              alt="arrow-icon"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsComponent;
