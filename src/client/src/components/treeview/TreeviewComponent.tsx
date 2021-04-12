import "./treeview.scss";
import { TreeviewHeader } from "./";
import { FlowTree } from "../flow";

const TreeviewComponent = () => (
  <div className="treeview_component">
    <div className="treestructur_container">
      <TreeviewHeader title="Treeview" />
      <FlowTree />
    </div>
  </div>
);
export default TreeviewComponent;
