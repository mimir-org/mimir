import {
  NewProjectIcon,
  OpenProjectIcon,
  WhiteArrowIcon,
  LeftArrowIcon,
  SearchIcon,
} from "../../../assets/icons";
import "./getIcon.scss";

interface Props {
  icon: String;
  onClick?: Function;
}

const GetIcon = ({ icon, onClick }: Props) => {
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
          src={WhiteArrowIcon}
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
          onClick={() => onClick()}
        />
      );
    case "SearchIcon":
      return <img src={SearchIcon} alt="search-icon" className="search_icon" />;
    default:
      return null;
  }
};

export default GetIcon;
