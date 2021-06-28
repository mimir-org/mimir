import red from "../../../../redux/store";
import { Connector } from "../../../../models";

const FindConnectorNode = (connector: Connector) => {
  const nodes = red.store.getState().projectState?.project.nodes;
  // const node = nodes.find()
};

export default FindConnectorNode;
