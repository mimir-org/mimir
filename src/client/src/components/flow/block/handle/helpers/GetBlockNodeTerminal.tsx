import { Handle } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Connector, Project, Node } from "../../../../../models";
import { GetTerminalColor } from "../../helpers";
import { HandleIcon } from "../components/HandleIcon";
import { HandleBox } from "../HandleComponent.styled";
import { OnMouseEnter, OnMouseLeave } from "../handlers/OnMouseHandler";
import { GetBlockHandleType, IsValidBlockConnection } from ".";
import { IsPartOfTerminal } from "../../../helpers/Connectors";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { GetLeftPosition, GetTopPosition } from "./GetTerminalPosition";

/**
 * Component to get a terminal for a BlockNode. React Flow's terminal is a Handle Component.
 * On top of the Handle component a wrapper with Mimir design is placed.
 * @param project
 * @param node
 * @param connector
 * @param dispatch
 * @param isElectro
 * @param isParent
 * @param visible
 * @param setVisible
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const GetBlockNodeTerminal = (
  project: Project,
  node: Node,
  connector: Connector,
  dispatch: Dispatch,
  isElectro: boolean,
  isParent: boolean,
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [type, pos] = GetBlockHandleType(connector, isElectro, isParent);
  const color = GetTerminalColor(connector);
  const isOffPage = IsOffPage(node);

  return (
    <HandleBox
      id={`handle-${connector.id}`}
      visible={visible}
      top={GetTopPosition(node, connector, isElectro, isParent)}
      left={GetLeftPosition(node, connector, isElectro, isParent)}
      isPartOf={IsPartOfTerminal(connector)}
      key={connector.id}
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
