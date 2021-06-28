import { Connector, Edge, Node, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";

const CheckTerminals = (
  edges: Edge[],
  type: RelationType | string
): [{ node: Node; connector: Connector }] => {
  let terminalsToRemove: [{ node: Node; connector: Connector }] = [
    { node: null, connector: null },
  ];

  edges?.forEach((edge) => {
    if (
      IsTransportTerminal(edge.fromConnector) &&
      edge.fromConnector.relationType === undefined
    ) {
      terminalsToRemove.push({
        node: edge.fromNode,
        connector: edge.fromConnector,
      });
    }
  });

  //   if (type !== null) {
  //     edges?.forEach((edge) => {
  //       if (edge.fromConnector.relationType === type) edgesToRemove.push(edge);
  //     });
  //     if (type === "Hide all") {
  //       edges?.forEach((edge) => {
  //         edgesToRemove.push(edge);
  //       });
  //     }
  //   } else {
  //     edges?.forEach((edge) => {
  //       if (
  //         IsTransportTerminal(edge.fromConnector) &&
  //         edge.fromConnector.relationType === undefined
  //       ) {
  //         edgesToRemove.push(edge);
  //       }
  //     });
  //   }
  console.log(terminalsToRemove);

  return terminalsToRemove;
};

export default CheckTerminals;
