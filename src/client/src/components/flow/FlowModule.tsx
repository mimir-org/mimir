import { FlowTree } from "./tree/FlowTree";
import { FlowBlock } from "./block/FlowBlock";
import { FlowModuleContainer } from "./FlowModule.styled";
import { Dispatch } from "redux";
import { VisualFilterData } from "../../models/application/VisualFilter";
import { ViewType } from "lib";

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
    {flowView === ViewType.Tree && <FlowTree inspectorRef={inspectorRef} dispatch={dispatch} filter={filter} />}
    {flowView === ViewType.Block && <FlowBlock inspectorRef={inspectorRef} dispatch={dispatch} filter={filter} />}
  </FlowModuleContainer>
);
