import { removeElements, FlowElement } from "react-flow-renderer";
import { Size } from "../../../compLibrary/size";
import { GetSelectedNode, IsAspectNode, IsBlockView, GetSelectedBlockNode } from "../../../helpers";
import { EDGE_KIND, Project } from "../../../models";
import { EDGE_TYPE, MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";

const useOnRemove = (
  elements: any[],
  setElements: any,
  dispatch: any,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project
) => {
  const verifiedList: any[] = [];
  const selectedNode = GetSelectedNode();
  const selectedBlockNode = GetSelectedBlockNode();
  const blockView = IsBlockView();
  const edgeTypes = Object.values(EDGE_TYPE);

  elements = elements.filter((el) => !IsAspectNode(el.data) && el !== selectedNode);

  let hasDeletedElement = false;

  for (var elem of elements) {
    const isEdge = isElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(blockView ? selectedBlockNode : selectedNode)) {
        if (findProjectEdgeByElementId(project, elem)?.isLocked) continue;
        hasDeletedElement = true;
        dispatch(removeEdge(elem.id));
        verifiedList.push(elem);
      }
    } else {
      if (findProjectNodeByElementId(project, elem)?.isLocked) continue;
      hasDeletedElement = true;
      dispatch(removeNode(elem.id));
      verifiedList.push(elem);
    }
  }

  if (hasDeletedElement) {
    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
    SetPanelHeight(inspectorRef, Size.ModuleClosed);
    dispatch(changeInspectorHeight(Size.ModuleClosed));
    return setElements((els) => removeElements(verifiedList, els));
  }
};

const isElementEdge = (edgeTypes: string[], element: FlowElement) => {
  return edgeTypes.some((x) => x === element.type?.toString() || element.data?.kind === EDGE_KIND);
};

const findProjectEdgeByElementId = (project: Project, element: FlowElement) => {
  return project.edges.find((edge) => edge.id === element.id);
};

const findProjectNodeByElementId = (project: Project, element: FlowElement) => {
  return project.nodes.find((node) => node.id === element.id);
};

export default useOnRemove;
