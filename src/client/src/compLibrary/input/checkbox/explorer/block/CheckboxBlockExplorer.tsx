import { CheckboxWrapper } from "./CheckboxBlockExplorer.styled";
import { Tooltip } from "../../../../tooltip/Tooltip";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Icon } from "@mimirorg/component-library";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  isAspectNode?: boolean;
  color: string;
  label?: string;
  icon?: string;
}

/**
 * Checkbox used in the BlockView's Explorer in Mimir.
 * @param interface
 * @returns a checkbox.
 */
export const CheckboxBlockExplorer = ({ onChange, isChecked, isAspectNode, color, icon, label }: Props) => (
  <Tooltip content={isChecked ? TextResources.UNSELECT_OBJECT : TextResources.SELECT_OBJECT} placement={"right"} offset={[0, 15]}>
    <CheckboxWrapper color={color}>
      <input type="checkbox" checked={isChecked} onChange={() => onChange()} />
      {isAspectNode && <Icon size={22} src={icon} alt="" />}
      {label && <span>{label}</span>}
    </CheckboxWrapper>
  </Tooltip>
);
