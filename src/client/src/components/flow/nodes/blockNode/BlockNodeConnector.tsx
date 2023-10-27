import { Handle, Connection as FlowConnection } from "react-flow-renderer";
import { HandleBox } from "./BlockNode.styled";
import { TerminalIcon } from "components/flow/terminals/TerminalIcon";
import { Block, Connector, ConnectorDirection, ViewType } from "lib";
import { ConnectorPartOf } from "lib/classes/Connector";

interface Props {
  connector: Connector;
  isElectroView: boolean;
  node: Block;
}

/**
 * Component for a BlockNode connector. React Flow's connector is of the type Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const BlockNodeConnector = ({ connector, isElectroView, node }: Props) => {
  const flowHandles = connector.getFlowtHandles(node.aspect, ViewType.Block);

  return (
    <>
      {connector &&
        flowHandles &&
        flowHandles.map((x) => {
          return (
            <HandleBox
              key={x.id}
              id={`handle-${x.id}`}
              hidden={x.hidden}
              top={GetHandleTopPosition(connector, isElectroView)}
              left={GetHandleLeftPosition(connector, isElectroView)}
              isPartOf={connector instanceof ConnectorPartOf}
              onMouseEnter={null}
              onMouseLeave={null}
            >
              <TerminalIcon
                connector={connector}
                color={connector.getColor()}
                className={x.className}
                isElectroView={isElectroView}
              />
              <Handle type={x.handleType} position={x.position} id={x.id} className={x.className} />
            </HandleBox>
          );
        })}
    </>
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
  return connector.direction === ConnectorDirection.Input ? "-10%" : "10%";
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
