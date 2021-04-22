import { useState } from "react";
import GetImg from "../../helpers/GetImg";
import textResources from "../../../../textResources";

interface OpenProjectButtonComponentProps {}

export const OpenProjectButtonComponent = ({}: OpenProjectButtonComponentProps) => {
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
