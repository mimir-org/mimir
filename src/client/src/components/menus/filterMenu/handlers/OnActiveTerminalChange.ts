import { EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { changeActiveConnector } from "../../../../redux/store/project/actions";
import { IsPartOf } from "../../../flow/helpers";

const OnActiveTerminalChange = (activeElements: any[], dispatch: any, visible: boolean) => {
  const edgeTypes = Object.values(EDGE_TYPE);

  // Toggle active terminals and edges
  activeElements.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      if (!IsPartOf(elem.fromConnector)) elem.isHidden = visible;
    } else dispatch(changeActiveConnector(elem?.nodeId, elem?.id, !visible, elem?.inputOrder, elem?.outputOrder));
  });
};

export default OnActiveTerminalChange;
