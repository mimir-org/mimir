import { FlowTree, FlowBlock } from ".";
import { VIEW_TYPE } from "../../models/project";
import { SaveState } from "../../redux/store/localStorage";

const FlowModule = ({ route }) => {
  if (route.type === undefined) {
    route.type = VIEW_TYPE.TREEVIEW;
    SaveState(true, VIEW_TYPE.TREEVIEW);
  }
  return (
    <div className="dndflow">
      {route.type === VIEW_TYPE.TREEVIEW ? <FlowTree /> : <FlowBlock />}
    </div>
  );
};

export default FlowModule;
