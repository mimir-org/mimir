import { ToolElementBox } from "./ToolbarElement.styled";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { Icon } from "../../../compLibrary/icon";

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
const ToolbarElement = ({ active, onClick, icon, label }: Props) => (
  <Tooltip content={label} placement={"bottom"} offset={[0, 10]}>
    <ToolElementBox active={active} onClick={() => onClick()}>
      <Icon size={15} src={icon} alt={label} />
    </ToolElementBox>
  </Tooltip>
);

export default ToolbarElement;
