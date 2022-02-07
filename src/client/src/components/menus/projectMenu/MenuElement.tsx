import { Icon } from "../../../compLibrary/icon";
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
    <Icon size={18} src={icon} alt="" />
    <span>{text}</span>
  </ProjectMenuElementBox>
);

export default MenuElement;
