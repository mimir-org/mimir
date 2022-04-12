import { Handle } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Connector, Project } from "../../../../../models";
import { GetTerminalColor } from "../../helpers";
import { HandleIcon } from "../components/HandleIcon";
import { HandleBox } from "../HandleComponent.styled";
import { OnMouseEnter, OnMouseLeave } from "../handlers/OnMouseHandler";
import { GetBlockHandleType, IsValidBlockConnection } from ".";

/**
 * Component to get a terminal for a BlockNode. React Flow's terminal is a Handle Component.
 * On top of the Handle component a wrapper with Mimir design is placed.
 * @param project
 * @param connector
 * @param offPage
 * @param dispatch
 * @param isElectro
 * @param visible
 * @param setVisible
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const GetBlockNodeTerminal = (
  project: Project,
  connector: Connector,
  offPage: boolean,
  dispatch: Dispatch,
  isElectro: boolean,
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [type, pos] = GetBlockHandleType(connector, isElectro);
  const color = GetTerminalColor(connector);

  return (
    <HandleBox
      visible={visible}
      id={`handle-${connector.id}`}
      key={connector.id}
      onMouseEnter={offPage ? () => OnMouseEnter(setVisible) : null}
      onMouseLeave={offPage ? () => OnMouseLeave(setVisible) : null}
    >
      <HandleIcon conn={connector} color={color} className={"react-flow__handle-block"} />
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className={"react-flow__handle-block"}
        isValidConnection={(connection) => IsValidBlockConnection(connection, project, dispatch)}
      />
    </HandleBox>
  );
};
