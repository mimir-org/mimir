import { Color } from "../../../../../assets/color/Color";
import { Checkbox } from "../../../../../compLibrary/input/checkbox/common/Checkbox";
import { IsConnectorVisible } from "../../../helpers/Connectors";
import { GetConnectorColor } from "../../helpers";
import { Connector } from "@mimirorg/modelbuilder-types";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../../../assets/text/TextResources";
import { TerminalIcon } from "./helpers/TerminalIcon";
import { OffPageRequiredInputIcon, OffPageRequiredOutputIcon } from "../../../../../assets/icons/offpage";
import {
  TerminalIconBox,
  OffPageCheckboxWrapper,
  TerminalsElementBox,
  OffPageIconBox,
  TerminalCheckboxWrapper,
} from "./TerminalsMenuElement.styled";

interface Props {
  connector: Connector;
  isInput: boolean;
  onClick: (conn: Connector, isInput: boolean, isOffPage?: boolean) => void;
}

/**
 * Component for a single terminal in the TerminalsMenu.
 * @param interface
 * @returns a clickable terminal with two checkboxex, one for a terminal, and for an OffPageNode.
 */
export const TerminalsMenuElement = ({ connector, isInput, onClick }: Props) => {
  const color = GetConnectorColor(connector);
  const connectorIsVisible = IsConnectorVisible(connector);
  const toolTipText = connectorIsVisible ? TextResources.OFFPAGE_REMOVE : TextResources.OFFPAGE_ADD;

  return (
    <TerminalsElementBox key={connector.id}>
      <TerminalCheckboxWrapper>
        <Checkbox
          isChecked={connectorIsVisible}
          onChange={() => onClick(connector, isInput, false)}
          color={Color.LIGHT_SILVER}
          id={connector.id}
        />
      </TerminalCheckboxWrapper>

      <TerminalIconBox>
        <TerminalIcon conn={connector} color={color} className={"icon"} isInput={isInput} />
        {connector.name}
      </TerminalIconBox>
      <OffPageIconBox>
        {isInput ? <OffPageRequiredInputIcon style={{ fill: color }} /> : <OffPageRequiredOutputIcon style={{ fill: color }} />}
      </OffPageIconBox>

      <Tooltip content={toolTipText} placement={"top"} offset={[0, 10]}>
        <OffPageCheckboxWrapper>
          <Checkbox
            isChecked={connectorIsVisible && connector.isRequired}
            onChange={() => onClick(connector, isInput, true)}
            color={Color.LIGHT_SILVER}
            id={connector.id}
          />
        </OffPageCheckboxWrapper>
      </Tooltip>
    </TerminalsElementBox>
  );
};
