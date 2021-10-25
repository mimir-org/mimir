import { TerminalsComponent } from "./tabs/terminals";
import { RelationsComponent } from "./tabs/relations";
import { ParametersComponent } from "./tabs/parameters";
import { SimpleTypesComponent } from "./tabs/simpleTypes";
import { AttributeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { IsNode } from "./helpers/IsType";

interface Props {
  element: InspectorElement;
  index: number;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
}

const InspectorContent = ({ element, index, attributeLikeItems, terminalLikeItems }: Props) => (
  <>
    {index === 1 && <ParametersComponent element={element} attributeLikeItems={attributeLikeItems} />}
    {index === 2 && <TerminalsComponent element={element} terminalLikeItems={terminalLikeItems} />}
    {index === 3 && <RelationsComponent element={element} />}
    {index === 4 && IsNode(element) && <SimpleTypesComponent node={element} />}
  </>
);

export default InspectorContent;
