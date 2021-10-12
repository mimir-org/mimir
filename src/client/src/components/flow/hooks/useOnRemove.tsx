import { removeElements } from "react-flow-renderer";
import { Size } from "../../../compLibrary";
import { EDGE_TYPE, MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import { GetSelectedEdge, IsAspectNode } from "../helpers";

const useOnRemove = (elementsToRemove, setElements, dispatch) => {
  const verifiedList: any[] = [];
  elementsToRemove = elementsToRemove.filter((el) => !IsAspectNode(el.data));
  const selectedEdge = GetSelectedEdge();

  elementsToRemove.forEach((elem: any) => {
    const edgeTypes = Object.values(EDGE_TYPE);
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString());

    if (isEdge) {
      if (
        (!IsAspectNode(elem.data.edge.fromNode) && !IsAspectNode(elem.data.edge.toNode)) ||
        elem.id === selectedEdge?.id
      ) {
        dispatch(removeEdge(elem.id));
        verifiedList.push(elem);
      }
    } else {
      dispatch(removeNode(elem.id));
      verifiedList.push(elem);
    }
  });

  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  SetPanelHeight(Size.ModuleClosed);
  dispatch(changeInspectorHeight(Size.ModuleClosed));

  return setElements((els) => removeElements(verifiedList, els));
};

export default useOnRemove;
