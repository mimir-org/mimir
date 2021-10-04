import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FlowTree } from "./tree";
import { FlowBlock } from "./block";
import { VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import { TypeEditorComponent } from "../modules/typeEditorModule";

/**
 * Component to display a module in Flow
 * @param route the route type
 * @returns a JSX element containing either TreeView, BlockView or the TypeEditor
 */
const FlowModule = ({ route }) => {
  const dispatch = useDispatch();

  if (!route.type) route.type = VIEW_TYPE.TREEVIEW;

  useEffect(() => {
    dispatch(changeFlowView(route.type));
  }, [dispatch, route.type]);

  return (
    <div className="dndflow">
      {route.type === VIEW_TYPE.TREEVIEW && <FlowTree />}
      {route.type === VIEW_TYPE.BLOCKVIEW && <FlowBlock />}
      {route.type === VIEW_TYPE.TYPE_EDITOR && <TypeEditorComponent />}
    </div>
  );
};

export default FlowModule;
