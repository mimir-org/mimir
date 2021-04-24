import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../../../redux/store/project/actions";
import GetImg from "../../helpers/GetImg";
import textResources from "../../../../textResources";
import { RootState } from "../../../../redux/store";
import { ProjectSimple } from "../../../../models/project";

export const OpenProjectButtonComponent = ({ projectId }) => {
  const dispatch = useDispatch();
  const [buttonHover, setbuttonHover] = useState(false);
  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  const isVisible = projects ? projects.length > 0 : false;

  return (
    isVisible && (
      <div className="open_project_button_wrapper">
        <div
          className="open_project_button"
          onMouseOver={() => {
            setbuttonHover(true);
          }}
          onMouseOut={() => {
            setbuttonHover(false);
          }}
          onClick={() => dispatch(get(projectId))} //"95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C"
        >
          <p className="open_project_button_text">
            {textResources.Project_recent_open}
          </p>
          {buttonHover ? (
            <GetImg icon="WhiteRightArrowIcon" />
          ) : (
            <GetImg icon="" />
          )}
        </div>
      </div>
    )
  );
};

export default OpenProjectButtonComponent;

//
