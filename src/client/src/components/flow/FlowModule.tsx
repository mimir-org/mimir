import { FlowTree } from "./tree";
import { FlowBlock } from "./block";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { TypeEditorComponent } from "../../typeEditor";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  flowView: ViewType;
}

/**
 * Component to display a module in Flow
 * @param route the route type
 * @returns a JSX element containing either TreeView, BlockView or the TypeEditor
 */
const FlowModule = ({ inspectorRef, flowView }: Props) => (
  <div className="dndflow">
    {flowView === VIEW_TYPE.TREEVIEW && <FlowTree inspectorRef={inspectorRef} />}
    {flowView === VIEW_TYPE.BLOCKVIEW && <FlowBlock inspectorRef={inspectorRef} />}
    {flowView === VIEW_TYPE.TYPE_EDITOR && <TypeEditorComponent />}
  </div>
);
export default FlowModule;
