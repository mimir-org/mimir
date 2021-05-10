import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../../../redux/store/project/actions";
import { GetIcon } from "../../helpers";
import { TextResources } from "../../../../assets/textResources";
import { RootState } from "../../../../redux/store";
import { ProjectSimple } from "../../../../models/project";
import { SetProject } from "../../../../redux/store/localStorage/localStorage";

export const OpenProjectButtonComponent = ({ projectId }) => {
  const dispatch = useDispatch();
  const [buttonHover, setbuttonHover] = useState(false);

  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  const handleMouseOver = () => {
    setbuttonHover(!buttonHover);
  };

  const handleMouseOut = () => {
    setbuttonHover(!buttonHover);
  };

  const handleClick = () => {
    SetProject(projectId); // LocalStorage update
    dispatch(get(projectId)); // Redux update
  };

  const isVisible = projects ? projects.length > 0 : false;

  return (
    isVisible && (
      <div className="open_project_button_wrapper">
        {/* <div
          className="open_project_button"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          <p className="open_project_button_text">
            {TextResources.Project_recent_open}
          </p>
          {buttonHover ? (
            <GetIcon icon="WhiteRightArrowIcon" />
          ) : (
            <GetIcon icon="" />
          )}
        </div> */}
      </div>
    )
  );
};

export default OpenProjectButtonComponent;
