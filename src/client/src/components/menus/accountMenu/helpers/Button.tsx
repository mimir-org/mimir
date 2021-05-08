import "./button.scss";
import GetIcon from "./GetIcon";

interface Props {
  icon: String;
  text?: String;
  onClick?: any;
}

export const Button = ({ icon, text, onClick }: Props) => {
  return (
    <div className="button_container" onClick={onClick}>
      <GetIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};

export default Button;
