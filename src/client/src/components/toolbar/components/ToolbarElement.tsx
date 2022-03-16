import { ToolElementBox } from "./ToolbarElement.styled";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { Icon } from "../../../compLibrary/icon";

interface Props {
  active?: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  borderLeft?: boolean;
  borderRight?: boolean;
  isLeftMenu?: boolean;
  leftMargin?: number;
}
/**
 * Component for one element in the ToolBar Component.
 * @param interface
 * @returns a clickable box in the ToolBar.
 */
export const ToolbarElement = ({ active, onClick, icon, label, borderLeft, borderRight, isLeftMenu, leftMargin = 0 }: Props) => (
  <Tooltip content={label} placement={"bottom"} offset={[0, 10]}>
    <ToolElementBox
      active={active}
      borderLeft={borderLeft}
      borderRight={borderRight}
      isLeftMenu={isLeftMenu}
      leftMargin={leftMargin}
      onClick={() => onClick()}
    >
      <Icon size={15} src={icon} alt={label} />
    </ToolElementBox>
  </Tooltip>
);
