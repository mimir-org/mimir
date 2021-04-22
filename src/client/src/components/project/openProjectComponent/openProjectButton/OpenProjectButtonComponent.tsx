import { useState } from "react";
import { useDispatch } from "react-redux";
import { get } from "../../../../redux/store/project/actions";
import GetImg from "../../helpers/GetImg";
import textResources from "../../../../textResources";

interface OpenProjectButtonComponentProps {}

export const OpenProjectButtonComponent = ({}: OpenProjectButtonComponentProps) => {
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
        onClick={() => dispatch(get("a9ad42e5-a88c-4195-afce-7d00d926a28d"))}
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
