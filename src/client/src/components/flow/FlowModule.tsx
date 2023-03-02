import FlowTree from "./tree/FlowTree";
import { FlowModuleContainer } from "./FlowModule.styled";
import { Dispatch } from "redux";
import { MimirProject } from "../../lib/classes/MimirProject";
import { VisualFilterData } from "../../lib/models/VisualFilter";
import { TerminalLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
  filter: VisualFilterData;
  project: MimirProject;
  terminals: TerminalLibCm;
  user: string;
}

/**
 * Component to display a module in Flow.
 * @param interface
 * @returns a JSX element containing either TreeView or BlockView.
 */
export const FlowModule = ({ inspectorRef, dispatch, filter, project, terminals, user }: Props) => (
  <FlowModuleContainer>
    <FlowTree
      inspectorRef={inspectorRef}
      dispatch={dispatch}
      filter={filter}
      project={project}
      terminals={terminals}
      user={user}
    />
    {/*{flowView === VIEW_TYPE.BLOCKVIEW && <FlowBlock inspectorRef={inspectorRef} dispatch={dispatch} filter={filter} />}*/}
  </FlowModuleContainer>
);
