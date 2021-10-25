import { Node, Connector, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { IsTransportTerminal } from "../../../flow/helpers";

const GetAllTerminals = (elements: any[]) => {
  const terminals: Connector[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (!isEdge) {
      const node = elem.data as Node;
      node.connectors?.forEach((c: Connector) => {
        if (IsTransportTerminal(c)) terminals.push(c);
      });
    }
  });

  return terminals;
};

export default GetAllTerminals;
