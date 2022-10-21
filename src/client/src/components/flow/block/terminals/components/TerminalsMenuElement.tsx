import { Color } from "../../../../../assets/color/Color";
import { Checkbox } from "../../../../../compLibrary/input/checkbox/common/Checkbox";
import { IsConnectorVisible } from "../../../helpers/Connectors";
import { GetConnectorColor } from "../../helpers";
import { Connector, Node } from "@mimirorg/modelbuilder-types";
import { TerminalIcon } from "./helpers/TerminalIcon";
import { TerminalIconBox, TerminalBox, TerminalElementBox, TerminalNameBox } from "./TerminalsMenuElement.styled";

interface Props {
  connector: Connector;
  isInput: boolean;
  node: Node;
  isElectroView: boolean;
  onClick: (conn: Connector, isInput: boolean, node: Node, isElectroView: boolean) => void;
}

/**
 * Component for a single terminal in the TerminalsMenu.
 * @param interface
 * @returns a clickable terminal
 */
export const TerminalsMenuElement = ({ connector, isInput, node, isElectroView, onClick }: Props) => {
  const color = GetConnectorColor(connector);
  const connectorIsVisible = IsConnectorVisible(connector);

  return (
    <TerminalElementBox>
      <TerminalBox key={connector.id} onClick={() => onClick(connector, isInput, node, isElectroView)}>
        <div>
          <Checkbox
            isChecked={connectorIsVisible}
            onChange={() => onClick(connector, isInput, node, isElectroView)}
            color={Color.LIGHT_SILVER}
            id={connector.id}
          />
        </div>
        <TerminalIconBox>
          <TerminalIcon connector={connector} color={color} className={""} isElectroView={isElectroView} />
        </TerminalIconBox>
        <TerminalNameBox>{connector.name}</TerminalNameBox>
      </TerminalBox>
    </TerminalElementBox>
  );
};
