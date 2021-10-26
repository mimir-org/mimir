import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { GetConnectorNode } from "../helpers";
import { IsFamily, IsProductTerminal, IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../../flow/helpers";

const OnChange = (actualEdge: Edge, edges: Edge[], dispatch: any) => {
  const partOf = IsPartOfTerminal(actualEdge.fromConnector);
  const location = IsLocationTerminal(actualEdge.fromConnector);
  const fulfilledBy = IsProductTerminal(actualEdge.fromConnector);
  const transport = IsTransportTerminal(actualEdge.fromConnector);

  // Find edges to be displayed or hidden
  edges.forEach((e) => {
    // PartOf
    if (partOf && IsPartOfTerminal(e.fromConnector)) {
      const source = GetConnectorNode(e.fromConnector);
      IsFamily(source, actualEdge.fromNode) && dispatch(setEdgeVisibility(e, !e.isHidden));
    }

    // Transport
    if (transport && IsTransportTerminal(e.fromConnector)) {
      if (e.fromConnector?.terminalTypeId === actualEdge.fromConnector?.terminalTypeId)
        dispatch(setEdgeVisibility(e, !e.isHidden));
    }

    // Relations
    if ((location && IsLocationTerminal(e.fromConnector)) || (fulfilledBy && IsProductTerminal(e.fromConnector)))
      dispatch(setEdgeVisibility(e, !e.isHidden));
  });
};

export default OnChange;
