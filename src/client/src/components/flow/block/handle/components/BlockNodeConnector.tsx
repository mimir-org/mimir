import { Handle } from "react-flow-renderer";
import { Dispatch } from "redux";
import { GetConnectorColor } from "../../helpers";
import { HandleIcon } from "./HandleIcon";
import { HandleBox } from "../HandleComponent.styled";
import { OnMouseEnter, OnMouseLeave } from "../handlers/OnMouseHandler";
import { GetBlockHandleType, IsValidBlockConnection } from "../helpers";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { GetHandleLeftPosition, GetHandleTopPosition } from "../helpers/GetConnectorPosition";
import { Node, Connector, Project } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../../../helpers/Connectors";

interface Props {
  project: Project;
  node: Node;
  connector: Connector;
  dispatch: Dispatch;
  isElectro: boolean;
  isParent: boolean;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Component for a BlockNode connector. React Flow's connector is of the type Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const BlockNodeConnector = ({ project, node, connector, dispatch, isElectro, isParent, visible, setVisible }: Props) => {
  const [type, pos] = GetBlockHandleType(connector, isElectro, isParent);
  const color = GetConnectorColor(connector);
  const isOffPage = IsOffPage(node);

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
      <HandleIcon conn={connector} color={color} className={"react-flow__handle-block"} />
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className={"react-flow__handle-block"}
        isValidConnection={(connection) => IsValidBlockConnection(connection, project.nodes, project.edges, dispatch)}
      />
    </HandleBox>
  );
};
