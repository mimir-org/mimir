import { setElectroView } from "../../../redux/store/electro/actions";
import { setActiveNode } from "../../../redux/store/project/actions";
import { GetSelectedNode } from "../../../helpers";

/**
 * Function to toggle Electro mode on/off. In Electro mode termials are displayed vertically.
 * @param dispatch
 * @param open
 */
const OnElectro = (dispatch: any, open: boolean) => {
  dispatch(setElectroView(!open));
  const selectedNode = GetSelectedNode();
  dispatch(setActiveNode(selectedNode.id, true));
};

export default OnElectro;
