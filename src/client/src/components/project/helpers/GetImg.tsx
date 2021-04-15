import {
  NewProjectIcon,
  OpenProjectIcon,
  RightArrowIcon,
  WhiteRightArrowIcon,
} from "../../../assets";
import "./getimg.scss";

const GetImg = (icon: string) => {
  switch (icon) {
    case "NewProjectIcon":
      return (
        <img
          src={NewProjectIcon}
          alt="new-project-icon"
          className="option_icon"
        />
      );
    case "OpenProjectIcon":
      return (
        <img
          src={OpenProjectIcon}
          alt="open-project-icon"
          className="option_icon"
        />
      );
    case "WhiteRightArrowIcon":
      return (
        <img
          src={WhiteRightArrowIcon}
          alt="white-arrow-icon"
          className="arrow_icon"
        />
      );
    default:
      return (
        <img src={RightArrowIcon} alt="arrow-icon" className="arrow_icon" />
      );
  }
};

export default GetImg;
