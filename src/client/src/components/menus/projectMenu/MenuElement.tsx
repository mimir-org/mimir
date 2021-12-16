import { ProjectMenuElementBox } from "../styled";

interface Props {
  text: string;
  icon: string;
  onClick?: () => void;
  disabled?: boolean | false;
  bottomLine?: boolean;
}

const MenuElement = ({ text, icon, onClick, disabled, bottomLine = false }: Props) => (
  <ProjectMenuElementBox onClick={() => !disabled && onClick()} disabled={disabled} bottomLine={bottomLine}>
    <div className="icon">
      <img src={icon} alt={text} />
    </div>
    <p className="text">{text}</p>
  </ProjectMenuElementBox>
);

export default MenuElement;
