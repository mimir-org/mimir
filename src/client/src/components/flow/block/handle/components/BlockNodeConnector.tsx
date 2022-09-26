import { Handle } from "react-flow-renderer";
import { Dispatch } from "redux";
import { GetConnectorColor } from "../../helpers";
import { HandleBox } from "../HandleComponent.styled";
import { OnMouseEnter, OnMouseLeave } from "../handlers/OnMouseHandler";
import { GetBlockHandleType, IsValidBlockConnection } from "../helpers";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { GetHandleLeftPosition, GetHandleTopPosition } from "../helpers/GetConnectorPosition";
import { Node, Connector, Project } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../../../helpers/Connectors";
import { TerminalIcon } from "../../terminals/components/helpers";

interface Props {
  project: Project;
  node: Node;
  connector: Connector;
  dispatch: Dispatch;
  isElectro: boolean;
  isParent: boolean;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isInput: boolean;
}

/**
 * Component for a BlockNode connector. React Flow's connector is of the type Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const BlockNodeConnector = ({
  project,
  node,
  connector,
  dispatch,
  isElectro,
  isParent,
  visible,
  setVisible,
  isInput,
}: Props) => {
  const [type, pos] = GetBlockHandleType(connector, isElectro, isParent);
  const color = GetConnectorColor(connector);
  const isOffPage = IsOffPage(node);
  const className = "react-flow__handle-block";

  return (
    <HandleBox
      id={`handle-${connector.id}`}
      visible={visible}
      top={GetHandleTopPosition(node, connector, isElectro, isParent)}
      left={GetHandleLeftPosition(node, connector, isElectro, isParent)}
      isPartOf={IsPartOfRelation(connector)}
      onMouseEnter={isOffPage ? () => OnMouseEnter(setVisible) : null}
      onMouseLeave={isOffPage ? () => OnMouseLeave(setVisible) : null}
    >
      <TerminalIcon conn={connector} color={color} isInput={isInput} className={className} />
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className={className}
        isValidConnection={(connection) => IsValidBlockConnection(connection, project.nodes, project.edges, dispatch)}
      />
    </HandleBox>
  );
};
