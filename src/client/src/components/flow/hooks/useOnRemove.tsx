import { removeElements } from "react-flow-renderer";
import { Size } from "../../../compLibrary";
import { EDGE_TYPE, MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";

const useOnRemove = (elementsToRemove, setElements, dispatch) => {
  elementsToRemove.forEach((element) => {
    const edgeTypes = Object.values(EDGE_TYPE);
    const isEdge =
      element.type === null ||
      element.type === undefined ||
      edgeTypes.some((x) => x === element.type?.toString());

    if (isEdge) dispatch(removeEdge(element.id));
    else dispatch(removeNode(element.id));
  });
  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  SetPanelHeight(Size.ModuleClosed);
  return setElements((els) => removeElements(elementsToRemove, els));
};

export default useOnRemove;
