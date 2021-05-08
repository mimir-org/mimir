import {
  VisualFilterIconClosed,
  VisualFilterIconOpen,
} from "../../../../assets/index";

const GetIcon = (isOpen: boolean, handleClick: () => void) => {
  const icon = isOpen ? VisualFilterIconOpen : VisualFilterIconClosed;

  return <img src={icon} alt="icon" className="icon" onClick={handleClick} />;
};

export default GetIcon;
