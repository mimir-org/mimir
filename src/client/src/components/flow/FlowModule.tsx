import { FlowTree, FlowBlock, FlowBlockLocation } from ".";

const FlowModule = ({ route }) => {
  return (
    <div className="dndflow">
      {route.type === "treeview" ? <FlowTree /> : <FlowBlock />}
      {/* {params.type === "treeview" ? <FlowTree /> : <FlowBlockLocation />} */}
    </div>
  );
};

export default FlowModule;
