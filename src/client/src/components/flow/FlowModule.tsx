import { useEffect } from "react";
import { FlowTree } from "./tree";
import { FlowBlock } from "./block";
import { VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import { TypeEditorComponent } from "../../typeEditor";
import { Dispatch } from "redux";
import { RouteParams } from "../home/Home";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  route: RouteParams;
  dispatch: Dispatch;
}

/**
 * Component to display a module in Flow
 * @param route the route type
 * @returns a JSX element containing either TreeView, BlockView or the TypeEditor
 */
const FlowModule = ({ inspectorRef, route, dispatch }: Props) => {
  if (!route.type) route.type = VIEW_TYPE.TREEVIEW;

  useEffect(() => {
    dispatch(changeFlowView(route.type));
  }, [dispatch, route.type]);

  return (
    <div className="dndflow">
      {route.type === VIEW_TYPE.TREEVIEW && <FlowTree inspectorRef={inspectorRef} />}
      {route.type === VIEW_TYPE.BLOCKVIEW && <FlowBlock inspectorRef={inspectorRef} />}
      {route.type === VIEW_TYPE.TYPE_EDITOR && <TypeEditorComponent />}
    </div>
  );
};

export default FlowModule;
