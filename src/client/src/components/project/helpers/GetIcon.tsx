import {
  NewProjectIcon,
  OpenProjectIcon,
  RightArrowIcon,
  WhiteRightArrowIcon,
  LeftArrowIcon,
  SearchIcon,
} from "../../../assets/icons";
import "./getIcon.scss";

interface Props {
  icon: String;
  imgOnClick?: Function;
}

const GetIcon = ({ icon, imgOnClick }: Props) => {
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
    case "LeftArrowIcon":
      return (
        <img
          src={LeftArrowIcon}
          alt="back-icon"
          className="back_icon"
          onClick={() => imgOnClick()}
        />
      );
    case "SearchIcon":
      return <img src={SearchIcon} alt="search-icon" className="search_icon" />;
    default:
      return (
        <img src={RightArrowIcon} alt="arrow-icon" className="arrow_icon" />
      );
  }
};

export default GetIcon;
