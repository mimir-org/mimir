import {
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
