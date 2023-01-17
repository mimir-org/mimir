import { FlowTree } from "./tree/FlowTree";
import { FlowBlock } from "./block/FlowBlock";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { FlowModuleContainer } from "./FlowModule.styled";
import { Dispatch } from "redux";
import { VisualFilterData } from "../../models/application/VisualFilter";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  flowView: ViewType;
  dispatch: Dispatch;
  filter: VisualFilterData;
}

/**
 * Component to display a module in Flow.
 * @param interface
 * @returns a JSX element containing either TreeView or BlockView.
 */
export const FlowModule = ({ inspectorRef, flowView, dispatch, filter }: Props) => (
  <FlowModuleContainer>
    {flowView === VIEW_TYPE.TREEVIEW && <FlowTree inspectorRef={inspectorRef} dispatch={dispatch} filter={filter} />}
    {flowView === VIEW_TYPE.BLOCKVIEW && <FlowBlock inspectorRef={inspectorRef} dispatch={dispatch} filter={filter} />}
  </FlowModuleContainer>
);
