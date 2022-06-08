import { Node } from "../../../../../../models";
import { createConnectedOffPageNode } from "../../../../../../redux/store/project/actions";
import { OffPageData, CreateOffPageObject } from "./CreateOffPageObject";
import { Position } from "../../../../../../models/project";
import { Dispatch } from "redux";
import { Connector } from "@mimirorg/modelbuilder-types";

/**
 * Component to create an OffPageNode that is connected.
 * The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 * This component is called from the HandleConnectedOffPageNode component.
 * @param sourceNode
 * @param sourceConnector
 * @param position
 * @param dispatch
 */
export const CreateConnectedOffPageNode = (
  sourceNode: Node,
  sourceConnector: Connector,
  position: Position,
  dispatch: Dispatch
) => {
  const isRequired = false;

  const data = {
    sourceNode,
    sourceConnector,
    position,
    isRequired,
  } as OffPageData;

  const offPageObject = CreateOffPageObject(data);
  dispatch(createConnectedOffPageNode(offPageObject));
};
