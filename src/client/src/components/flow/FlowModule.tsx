import { FlowTree, FlowBlock } from ".";
import { VIEW_TYPE } from "../../models/project";
import SaveViewState from "../header/helpers/SaveViewState";

const FlowModule = ({ route }) => {
  if (route.type === undefined) route.type = VIEW_TYPE.TREEVIEW;
  SaveViewState(route.type);

  return (
    <div className="dndflow">
      {route.type === VIEW_TYPE.TREEVIEW ? <FlowTree /> : <FlowBlock />}
    </div>
  );
};

export default FlowModule;
