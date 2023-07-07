import {
  TreeConnectionPartOf,
  BlockConnectionTerminal,
  TreeConnectionRelation,
  TreeConnectionTerminal,
  BlockConnectionTerminalHandle,
} from "components/flow/edges";

const GetEdgeTypes = {
  TreeConnectionPartOf: TreeConnectionPartOf,
  TreeConnectionFulfilledBy: TreeConnectionRelation,
  TreeConnectionHasLocation: TreeConnectionRelation,
  TreeConnectionTerminal: TreeConnectionTerminal,
  BlockConnectionTerminal: BlockConnectionTerminal,
  BlockConnectionTerminalHandle: BlockConnectionTerminalHandle,
};

export default GetEdgeTypes;
