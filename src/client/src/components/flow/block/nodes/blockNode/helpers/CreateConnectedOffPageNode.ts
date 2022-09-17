import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { createConnectedOffPageNode } from "../../../../../../redux/store/project/actions";
import { CreateOffPageObject } from "./CreateOffPageObject";
import { OffPageData, Position } from "../../../../../../models/project";
import { Dispatch } from "redux";

/**
 * Component to create an OffPageNode that is connected.
 * The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 * This component is called from the HandleConnectedOffPageNode component.
 * @param sourceNode
 * @param sourceConnector
 * @param position
 * @param isElectroView
 * @param dispatch
 */
export const CreateConnectedOffPageNode = (
  sourceNode: Node,
  sourceConnector: Connector,
  position: Position,
  isElectroView: boolean,
  dispatch: Dispatch
) => {
  const isRequired = false;

  const data = {
    sourceNode,
    sourceConnector,
    position,
    isRequired,
  } as OffPageData;

  const offPageObject = CreateOffPageObject(data, isElectroView);
  dispatch(createConnectedOffPageNode(offPageObject));
};
