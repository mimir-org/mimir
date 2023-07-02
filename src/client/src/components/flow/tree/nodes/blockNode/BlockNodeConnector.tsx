import { Handle, Connection as FlowConnection } from "react-flow-renderer";
import { HandleBox } from "./BlockNode.styled";
import { TerminalIcon } from "../../../block/terminals/components/helpers/TerminalIcon";
import { Connector, ConnectorDirection } from "lib";
import { ConnectorPartOf } from "../../../../../lib/classes/Connector";

interface Props {
  connector: Connector;
  isElectroView: boolean;
  visible: boolean;
}

/**
 * Component for a BlockNode connector. React Flow's connector is of the type Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const BlockNodeConnector = ({ connector, isElectroView, visible }: Props) => {
  const [type, pos] = connector.GetHandleType();
  const color = connector.getColor();
  const className = "react-flow__handle-block";

  return (
    <HandleBox
      id={`handle-${connector.id}`}
      visible={visible}
      top={GetHandleTopPosition(connector, isElectroView)}
      left={GetHandleLeftPosition(connector, isElectroView)}
      isPartOf={connector instanceof ConnectorPartOf}
      onMouseEnter={null}
      onMouseLeave={null}
    >
      <TerminalIcon connector={connector} color={color} className={className} isElectroView={isElectroView} />
      <Handle type={type} position={pos} id={connector.id} className={className} isValidConnection={(connection) => true} />
    </HandleBox>
  );
};

/**
 * Component to get the left position of a connector in BlockView.
 * This component is called from the BlockNodeTerminal.
 * @param node
 * @param connector
 * @param isElectro
 * @param isParent
 * @returns a string representing the left position.
 */
export const GetHandleLeftPosition = (connector: Connector, isElectro: boolean) => {
  if (connector instanceof ConnectorPartOf) return "revert";
  if (isElectro) return GetElectroLeftPosition(connector);
  return "46%";
};

/**
 * Component to get the top position of a connector in BlockView.
 * This component is called from the BlockNodeTerminal.
 * @param node
 * @param connector
 * @param isElectro
 * @param isParent
 * @returns
 */
export const GetHandleTopPosition = (connector: Connector, isElectro: boolean) => {
  if (!(connector instanceof ConnectorPartOf)) return "0px";
  if (isElectro) return GetElectroTopPosition();

  if (connector.direction === ConnectorDirection.Input) return "0px";
  if (connector.direction === ConnectorDirection.Output) return "115px";
};

function GetElectroLeftPosition(connector: Connector) {
  return connector.direction === ConnectorDirection.Input ? "0px" : "180x";
}

function GetElectroTopPosition() {
  return "50px";
}
