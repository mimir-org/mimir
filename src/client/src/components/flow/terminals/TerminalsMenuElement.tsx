import { Color } from "assets/color/Color";
import { Checkbox } from "compLibrary/input/checkbox/common/Checkbox";
import { TerminalIcon } from "./TerminalIcon";
import { AddTerminalComponent } from "./AddTerminalComponent";
import { RemoveTerminalComponent } from "./RemoveTerminalComponent";
import { AspectObject, Connector, ConnectorTerminal, ConnectorDirection } from "lib";
import {
  TerminalBox,
  TerminalElementBox,
  TerminalIconBox,
  TerminalNameBox,
} from "components/flow/terminals/TerminalsMenuComponent.styled";

interface Props {
  connector: Connector;
  isInput: boolean;
  node: AspectObject;
  isElectroView: boolean;
  onClick: (conn: Connector, isInput: boolean, node: AspectObject, isElectroView: boolean) => void;
  onClickAddTerminal: (terminalId: string) => void;
  onClickRemoveTerminal: (terminalId: string) => void;
}

/**
 * Component for a single terminal in the TerminalsMenu.
 * @param interface
 * @returns a clickable terminal
 */
export const TerminalsMenuElement = ({
  connector,
  isInput,
  node,
  isElectroView,
  onClick,
  onClickAddTerminal,
  onClickRemoveTerminal,
}: Props) => {
  const color = connector.getColor();

  return (
    <TerminalElementBox>
      <TerminalBox key={connector.id} onClick={() => onClick(connector, isInput, node, isElectroView)}>
        <div>
          <Checkbox
            isChecked={connector.selected}
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
      <RemoveTerminalComponent
        color={color}
        nodeId={node.id}
        terminalId={connector.id}
        onClick={() => onClickRemoveTerminal(connector.id)}
      />
      <AddTerminalComponent
        color={color}
        typeId={connector instanceof ConnectorTerminal && connector.terminalType}
        nodeId={node.id}
        direction={isInput ? ConnectorDirection.Input : ConnectorDirection.Output}
        onClick={() => onClickAddTerminal(connector.id)}
      />
    </TerminalElementBox>
  );
};
