import { removeElements } from "react-flow-renderer";
import { EDGE_TYPE } from "../../../models/project";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";

const useOnRemove = (elementsToRemove, setElements, dispatch) => {
  elementsToRemove.forEach((element) => {
    const edgeTypes = Object.values(EDGE_TYPE);
    const isEdge =
      element.type === null ||
      element.type === undefined ||
      edgeTypes.some((x) => x === element.type?.toString());

    if (isEdge) {
      dispatch(removeEdge(element.id));
    } else {
      dispatch(removeNode(element.id));
    }
  });
  return setElements((els) => removeElements(elementsToRemove, els));
};

export default useOnRemove;
