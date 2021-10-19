import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../../flow/helpers";

const OnChange = (edge: Edge, edges: Edge[], dispatch: any) => {
  const isPartOf = IsPartOfTerminal(edge.fromConnector);
  const isLocation = IsLocationTerminal(edge.fromConnector);
  const isTransport = IsTransportTerminal(edge.fromConnector);

  edges.forEach((e) => {
    if (isPartOf) IsPartOfTerminal(e.fromConnector) && dispatch(setEdgeVisibility(e, !e.isHidden));
    if (isLocation) IsLocationTerminal(e.fromConnector) && dispatch(setEdgeVisibility(e, !e.isHidden));
    if (isTransport) IsTransportTerminal(e.fromConnector) && dispatch(setEdgeVisibility(e, !e.isHidden));
  });
};

export default OnChange;
