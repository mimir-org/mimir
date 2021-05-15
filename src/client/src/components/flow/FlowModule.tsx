import { FlowTree, FlowBlock } from ".";
import { VIEW_TYPE } from "../../models/project";
import { SaveView } from "../../redux/store/localStorage";

const FlowModule = ({ route }) => {
  if (!route.type) route.type = VIEW_TYPE.TREEVIEW;
  SaveView(route.type);

  return (
    <div className="dndflow">
      {route.type === VIEW_TYPE.TREEVIEW ? <FlowTree /> : <FlowBlock />}
    </div>
  );
};

export default FlowModule;
