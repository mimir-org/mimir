import "./getIcon.scss";
import { SearchIcon } from "../../../assets/icons/";

interface Props {
  icon: string;
  onClick?: Function;
}

const GetIcon = ({ icon, onClick }: Props) => {
  switch (icon) {
    case "SearchIcon":
      return <img src={SearchIcon} alt="search-icon" className="search_icon" />;
    default:
      return null;
  }
};

export default GetIcon;
