import { Connector, RelationType } from "../../../../models";

const IsLocationTerminal = (conn: Connector) => {
  return conn?.relationType === RelationType.HasLocation;
};

export default IsLocationTerminal;
