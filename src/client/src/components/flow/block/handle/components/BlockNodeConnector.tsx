import { Handle } from "react-flow-renderer";
import { Dispatch } from "redux";
import { HandleBox } from "../HandleComponent.styled";
import { GetBlockHandleType, IsValidBlockConnection } from "../helpers";
import { GetHandleLeftPosition, GetHandleTopPosition } from "../helpers/GetConnectorPosition";
import { TerminalIcon } from "../../terminals/components/helpers/TerminalIcon";
import { AspectObject, Connector, Project } from "lib";
import { ConnectorPartOf } from "../../../../../lib/classes/Connector";

interface Props {
  project: Project;
  node: AspectObject;
  connector: Connector;
  dispatch: Dispatch;
  isElectroView: boolean;
  isParent: boolean;
  visible: boolean;
}

/**
 * Component for a BlockNode connector. React Flow's connector is of the type Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const BlockNodeConnector = ({ project, node, connector, dispatch, isElectroView, isParent, visible }: Props) => {
  const [type, pos] = GetBlockHandleType(connector, isElectroView, isParent);
  const color = connector.getColor();
  const className = "react-flow__handle-block";

  return (
    <HandleBox
      id={`handle-${connector.id}`}
      visible={visible}
      top={GetHandleTopPosition(node, connector, isElectroView, isParent)}
      left={GetHandleLeftPosition(node, connector, isElectroView, isParent)}
      isPartOf={connector instanceof ConnectorPartOf}
      onMouseEnter={null}
      onMouseLeave={null}
    >
      <TerminalIcon connector={connector} color={color} className={className} isElectroView={isElectroView} />
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className={className}
        isValidConnection={(connection) =>
          IsValidBlockConnection(connection, project.aspectObjects, project.connections, dispatch)
        }
      />
    </HandleBox>
  );
};
