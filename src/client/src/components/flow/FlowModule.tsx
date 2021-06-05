import { useDispatch } from "react-redux";
import { FlowTree, FlowBlock } from ".";
import { VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import TypeEditorComponent from "../modules/typeEditorModule/TypeEditorComponent";

const FlowModule = ({ route }) => {
  const dispatch = useDispatch();

  if (!route.type) route.type = VIEW_TYPE.TREEVIEW;
  dispatch(changeFlowView(route.type));

  return (
    <div className="dndflow">
      {route.type === VIEW_TYPE.TREEVIEW ? (
        <FlowTree />
      ) : route.type === VIEW_TYPE.BLOCKVIEW ? (
        <FlowBlock />
      ) : route.type === VIEW_TYPE.TYPE_EDITOR ? (
        <TypeEditorComponent mode={null} />
      ) : null}
    </div>
  );
};

export default FlowModule;
