import { useState } from "react";
import { useDispatch } from "react-redux";
import { get } from "../../../../redux/store/project/actions";
import GetImg from "../../helpers/GetImg";
import textResources from "../../../../textResources";

export const OpenProjectButtonComponent = ({ projectId }) => {
  console.log("test projectid: ", projectId);
  const dispatch = useDispatch();
  const [buttonHover, setbuttonHover] = useState(false);

  return (
    <div className="open_project_button_wrapper">
      <div
        className="open_project_button"
        onMouseOver={() => {
          setbuttonHover(true);
        }}
        onMouseOut={() => {
          setbuttonHover(false);
        }}
        onClick={() => dispatch(get("95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C"))}
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
  );
};

export default OpenProjectButtonComponent;

//
