import { Project } from "../../../../models";
import { IsBidirectionalTerminal } from "../../helpers";

/**
 * Component to set the correct value of bidirectional terminals on first render of BlockView.
 * @param project
 */
const SetBidirectionalTerminals = (project: Project) => {
  project?.nodes?.forEach((n) => {
    n.connectors.forEach((conn) => {
      if (conn.visible && IsBidirectionalTerminal(conn)) {
        conn.isBidirectionalInput = true;
      }
    });
  });
};

export default SetBidirectionalTerminals;
