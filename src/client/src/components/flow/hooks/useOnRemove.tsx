import { removeElements } from "react-flow-renderer";
import { Size } from "../../../compLibrary";
import { EDGE_KIND } from "../../../models";
import { EDGE_TYPE, MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import { GetSelectedBlockNode, IsBlockView } from "../block/helpers";
import { GetSelectedNode, IsAspectNode } from "../helpers";

const useOnRemove = (elements: any[], setElements: any, dispatch: any, inspectorRef: React.MutableRefObject<HTMLDivElement>) => {
  const verifiedList: any[] = [];
  const selectedNode = GetSelectedNode();
  const selectedBlockNode = GetSelectedBlockNode();
  const blockView = IsBlockView();
  const edgeTypes = Object.values(EDGE_TYPE);

  elements = elements.filter((el) => !IsAspectNode(el.data) && el !== selectedNode);

  elements.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      if (!IsAspectNode(blockView ? selectedBlockNode : selectedNode)) {
        dispatch(removeEdge(elem.id));
        verifiedList.push(elem);
      }
    } else {
      dispatch(removeNode(elem.id));
      verifiedList.push(elem);
    }
  });

  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  SetPanelHeight(inspectorRef, Size.ModuleClosed);
  dispatch(changeInspectorHeight(Size.ModuleClosed));

  return setElements((els) => removeElements(verifiedList, els));
};

export default useOnRemove;
