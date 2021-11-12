import { Connector } from "../../../models";
import { CheckboxWrapper } from "./styled";

interface Props {
  connector: Connector;
  onChange: (connector: Connector) => void;
}
/**
 * Checkbox used for terminals in Mimir.
 * @param interface
 * @returns a checkbox.
 */
const CheckboxTerminal = ({ connector, onChange }: Props) => (
  <CheckboxWrapper>
    <input type="checkbox" checked={connector.visible} onChange={() => onChange(connector)} />
    <div className="checkmark"></div>
  </CheckboxWrapper>
);

export default CheckboxTerminal;
