import { AspectColorType, Node } from "../../../models";
import { CheckboxWrapper } from "./styled";
import { GetAspectColor } from "../../../helpers";

interface Props {
  node: Node;
  label: string;
  onChange: () => void;
}
/**
 * Component for checkbox in Mimir.
 * @param interface
 * @returns a checkbox.
 */
const Checkbox = ({ node, label, onChange }: Props) => (
  <CheckboxWrapper color={GetAspectColor(node, AspectColorType.Selected)}>
    <input type="checkbox" checked={!node?.isHidden ?? false} onChange={() => onChange()} />
    <div className="label">{label}</div>
  </CheckboxWrapper>
);

export default Checkbox;
