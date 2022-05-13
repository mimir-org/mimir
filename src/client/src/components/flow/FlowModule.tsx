import { FlowTree } from "./tree/FlowTree";
import { FlowBlock } from "./block/";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { TypeEditorComponent } from "../../typeEditor";
import { FlowModuleContainer } from "./FlowModule.styled";
import { Dispatch } from "redux";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  flowView: ViewType;
  dispatch: Dispatch;
}

/**
 * Component to display a module in Flow.
 * @param interface
 * @returns a JSX element containing either TreeView, BlockView or the TypeEditor.
 */
export const FlowModule = ({ inspectorRef, flowView, dispatch }: Props) => (
  <FlowModuleContainer>
    {flowView === VIEW_TYPE.TREEVIEW && <FlowTree inspectorRef={inspectorRef} dispatch={dispatch} />}
    {flowView === VIEW_TYPE.BLOCKVIEW && <FlowBlock inspectorRef={inspectorRef} dispatch={dispatch} />}
    {flowView === VIEW_TYPE.TYPE_EDITOR && <TypeEditorComponent />}
  </FlowModuleContainer>
);
