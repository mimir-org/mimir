import { FlowTree, FlowBlock } from ".";
import { VIEW_TYPE } from "../../models/project";
import { SetView } from "../../redux/store/localStorage";
import TypeEditorComponent from "../modules/typeEditorModule/TypeEditorComponent";

const FlowModule = ({ route }) => {
  if (!route.type) route.type = VIEW_TYPE.TREEVIEW;
  SetView(route.type);

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
