import { ToolElementBox } from "./styled";

interface Props {
  active?: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}
/**
 * Component for one element in the ToolBar Component.
 * @param interface
 * @returns a clickable box in the ToolBar.
 */
const ToolBarElement = ({ active, onClick, icon, label }: Props) => (
  <ToolElementBox active={active} onClick={() => onClick()}>
    <img src={icon} alt={label} className="logo" />
  </ToolElementBox>
);

export default ToolBarElement;
