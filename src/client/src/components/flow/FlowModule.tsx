import { FlowTree, FlowBlock } from ".";

const FlowModule = ({ route }) => {
  return (
    <div className="dndflow">
      {route.type === "treeview" ? <FlowTree /> : <FlowBlock />}
    </div>
  );
};

export default FlowModule;
