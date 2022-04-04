import { FlowTree } from "./tree";
import { FlowBlock } from "./block";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { TypeEditorComponent } from "../../typeEditor";

import { FlowModuleContainer } from "./FlowModule.styled";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  flowView: ViewType;
}

/**
 * Component to display a module in Flow.
 * @param route the route type
 * @returns a JSX element containing either TreeView, BlockView or the TypeEditor.
 */
const FlowModule = ({ inspectorRef, flowView }: Props) => (
  <FlowModuleContainer>
    {flowView === VIEW_TYPE.TREEVIEW && <FlowTree inspectorRef={inspectorRef} />}
    {flowView === VIEW_TYPE.BLOCKVIEW && <FlowBlock inspectorRef={inspectorRef} />}
    {flowView === VIEW_TYPE.TYPE_EDITOR && <TypeEditorComponent />}
  </FlowModuleContainer>
);
export default FlowModule;
