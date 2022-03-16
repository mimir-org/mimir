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
  isLeft?: boolean;
}
/**
 * Component for one element in the ToolBar Component.
 * @param interface
 * @returns a clickable box in the ToolBar.
 */
export const ToolbarElement = ({ active, onClick, icon, label, borderLeft, borderRight, isLeft }: Props) => (
  <Tooltip content={label} placement={"bottom"} offset={[0, 10]}>
    <ToolElementBox active={active} borderLeft={borderLeft} borderRight={borderRight} isLeft={isLeft} onClick={() => onClick()}>
      <Icon size={15} src={icon} alt={label} />
    </ToolElementBox>
  </Tooltip>
);
