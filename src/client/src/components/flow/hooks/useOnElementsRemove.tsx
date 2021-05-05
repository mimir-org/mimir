import { removeElements } from "react-flow-renderer";
import { EDGE_TYPE } from "../../../models/project";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";

const onElementsRemove = (elementsToRemove, setElements, dispatch) => {
  elementsToRemove.forEach((element) => {
    if (element.type === EDGE_TYPE.DEFAULT) {
      dispatch(removeEdge(element.id));
    } else {
      dispatch(removeNode(element.id));
    }
  });
  return setElements((els) => removeElements(elementsToRemove, els));
};

export default onElementsRemove;
