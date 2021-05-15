import { FlowTree, FlowBlock } from ".";
import { VIEW_TYPE } from "../../models/project";

const FlowModule = ({ route }) => {
  if (route.type === undefined) {
    route.type = VIEW_TYPE.TREEVIEW;
  }
  return (
    <div className="dndflow">
      {route.type === VIEW_TYPE.TREEVIEW ? <FlowTree /> : <FlowBlock />}
    </div>
  );
};

export default FlowModule;
