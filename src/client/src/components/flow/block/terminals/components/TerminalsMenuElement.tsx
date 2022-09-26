import { Color } from "../../../../../assets/color/Color";
import { Checkbox } from "../../../../../compLibrary/input/checkbox/common/Checkbox";
import { IsConnectorVisible } from "../../../helpers/Connectors";
import { GetConnectorColor } from "../../helpers";
import { Connector, Node } from "@mimirorg/modelbuilder-types";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../../../assets/text/TextResources";
import { TerminalIcon, OffPageTerminalIcon } from "./helpers/";
import {
  TerminalIconBox,
  OffPageCheckboxWrapper,
  OffPageIconBox,
  TerminalOffPageBox,
  TerminalsElementBox,
  MainShit,
} from "./TerminalsMenuElement.styled";

interface Props {
  connector: Connector;
  isInput: boolean;
  node: Node;
  isElectroView: boolean;
  onClick: (conn: Connector, isInput: boolean, node: Node, isElectroView: boolean, isOffPage?: boolean) => void;
}

/**
 * Component for a single terminal in the TerminalsMenu.
 * @param interface
 * @returns a clickable terminal with two checkboxex, one for a terminal, and for an OffPageNode.
 */
export const TerminalsMenuElement = ({ connector, isInput, node, isElectroView, onClick }: Props) => {
  const color = GetConnectorColor(connector);
  const connectorIsVisible = IsConnectorVisible(connector);
  const toolTipText = connectorIsVisible ? TextResources.OFFPAGE_REMOVE : TextResources.OFFPAGE_ADD;

  return (
    <MainShit>
      <TerminalsElementBox key={connector.id} onClick={() => onClick(connector, isInput, node, isElectroView, false)}>
        <div>
          <Checkbox
            isChecked={connectorIsVisible}
            onChange={() => onClick(connector, isInput, node, isElectroView, false)}
            color={Color.LIGHT_SILVER}
            id={connector.id}
          />
        </div>
        <TerminalIconBox>
          <TerminalIcon connector={connector} color={color} className={"icon"} isElectroView={isElectroView} />
          {connector.name}
        </TerminalIconBox>
      </TerminalsElementBox>

      <Tooltip content={toolTipText} placement={"top"} offset={[0, 10]}>
        <TerminalOffPageBox>
          <OffPageIconBox onClick={() => onClick(connector, isInput, node, isElectroView, true)}>
            <OffPageTerminalIcon conn={connector} color={color} className={"icon"} isElectroView={isElectroView} />
          </OffPageIconBox>
          <OffPageCheckboxWrapper>
            <Checkbox
              isChecked={connectorIsVisible && connector.isRequired}
              onChange={() => onClick(connector, isInput, node, isElectroView, true)}
              color={Color.LIGHT_SILVER}
              id={connector.id}
            />
          </OffPageCheckboxWrapper>
        </TerminalOffPageBox>
      </Tooltip>
    </MainShit>
  );
};
