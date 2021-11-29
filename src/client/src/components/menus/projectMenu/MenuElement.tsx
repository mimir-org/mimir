import { ProjectMenuElementBox } from "../styled";

interface Props {
  text: string;
  icon: string;
  onClick?: () => void;
  disabled?: boolean | false;
}

const MenuElement = ({ text, icon, onClick, disabled }: Props) => (
  <ProjectMenuElementBox onClick={onClick} disabled={disabled}>
    <div className="icon">
      <img src={icon} alt={text} />
    </div>
    <p className="text">{text}</p>
  </ProjectMenuElementBox>
);

export default MenuElement;
