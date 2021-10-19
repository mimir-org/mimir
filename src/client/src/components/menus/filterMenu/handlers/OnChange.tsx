import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsFamily, IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../../flow/helpers";
import { GetConnectorNode } from "../helpers";

const OnChange = (actualEdge: Edge, edges: Edge[], dispatch: any) => {
  const partOf = IsPartOfTerminal(actualEdge.fromConnector);
  const location = IsLocationTerminal(actualEdge.fromConnector);
  const transport = IsTransportTerminal(actualEdge.fromConnector);

  // Find edges to be displayed or hidden
  edges.forEach((e) => {
    if (partOf && IsPartOfTerminal(e.fromConnector)) {
      const source = GetConnectorNode(e.fromConnector);
      IsFamily(source, actualEdge.fromNode) && dispatch(setEdgeVisibility(e, !e.isHidden));
    }

    if (transport && IsTransportTerminal(e.fromConnector)) {
      if (e.fromConnector?.terminalTypeId === actualEdge.fromConnector?.terminalTypeId)
        dispatch(setEdgeVisibility(e, !e.isHidden));
    }

    if (location && IsLocationTerminal(e.fromConnector)) dispatch(setEdgeVisibility(e, !e.isHidden));
  });
};

export default OnChange;
