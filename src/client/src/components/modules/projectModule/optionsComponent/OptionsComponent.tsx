import {
  NewProjectIcon,
  OpenProjectIcon,
  RightArrowIcon,
} from "../../../../assets";
import textResources from "../../../../textResources";

export const OptionsComponent = () => {
  return (
    <div className="options_component_container">
      <div className="options_content">
        <p className="options_header">{textResources.Project_heading}</p>
        <div className="option_container">
          <img
            className="option_icon"
            src={NewProjectIcon}
            alt="new-project-icon"
          ></img>
          <p className="option_text">{textResources.Project_new_project}</p>
          <img
            className="arrow_icon"
            src={RightArrowIcon}
            alt="arrow-icon"
          ></img>
        </div>
        <div className="option_container">
          <img
            className="option_icon"
            src={OpenProjectIcon}
            alt="open-project-icon"
          ></img>
          <p className="option_text">{textResources.Project_open_project}</p>
          <img
            className="arrow_icon"
            src={RightArrowIcon}
            alt="arrow-icon"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default OptionsComponent;
