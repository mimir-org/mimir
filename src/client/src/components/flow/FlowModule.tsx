import { FlowTree } from "./tree/FlowTree";
import { FlowBlock } from "./block/FlowBlock";
import { VIEW_TYPE, ViewType } from "../../models/project";
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
 * @returns a JSX element containing either TreeView or BlockView.
 */
export const FlowModule = ({ inspectorRef, flowView, dispatch }: Props) => (
  <FlowModuleContainer>
    {flowView === VIEW_TYPE.TREEVIEW && <FlowTree inspectorRef={inspectorRef} dispatch={dispatch} />}
    {flowView === VIEW_TYPE.BLOCKVIEW && <FlowBlock inspectorRef={inspectorRef} dispatch={dispatch} />}
  </FlowModuleContainer>
);
