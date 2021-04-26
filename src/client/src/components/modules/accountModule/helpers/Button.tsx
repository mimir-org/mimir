import "./button.scss";
import GetImg from "./GetImg";
interface ButtonProps {
  icon: String;
  text: String;
  onclick?: () => void;
}

export const Button = ({ icon, text, onclick }: ButtonProps) => {
  return (
    <div className="button_container" onClick={() => onclick}>
      <GetImg icon={icon} />
      <p>{text}</p>
    </div>
  );
};

export default Button;
