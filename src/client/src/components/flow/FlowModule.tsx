import { FlowTree } from "./tree";
import { FlowBlock } from "./block";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { TypeEditorComponent } from "../../typeEditor";
import { Project } from "../../models";

interface Props {
  project: Project;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  flowView: ViewType;
}

/**
 * Component to display a module in Flow
 * @param route the route type
 * @returns a JSX element containing either TreeView, BlockView or the TypeEditor
 */
const FlowModule = ({ project, inspectorRef, flowView }: Props) => (
  <div className="dndflow">
    {flowView === VIEW_TYPE.TREEVIEW && <FlowTree project={project} inspectorRef={inspectorRef} />}
    {flowView === VIEW_TYPE.BLOCKVIEW && <FlowBlock project={project} inspectorRef={inspectorRef} />}
    {flowView === VIEW_TYPE.TYPE_EDITOR && <TypeEditorComponent />}
  </div>
);
export default FlowModule;
