import { TerminalsComponent } from "./tabs/terminals";
import { RelationsComponent } from "./tabs/relations";
import { ParametersComponent } from "./tabs/parameters";
import { SimpleTypesComponent } from "./tabs/simpleTypes";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";

interface Props {
  element: InspectorElement;
  index: number;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  compositeLikeItems?: CompositeLikeItem[];
}

const InspectorContent = ({ element, index, attributeLikeItems, terminalLikeItems, compositeLikeItems }: Props) => (
  <>
    {index === 1 && <ParametersComponent element={element} attributeLikeItems={attributeLikeItems} />}
    {index === 2 && <TerminalsComponent element={element} terminalLikeItems={terminalLikeItems} />}
    {index === 3 && <RelationsComponent element={element} />}
    {index === 4 && <SimpleTypesComponent element={element} compositeLikeItems={compositeLikeItems} />}
  </>
);

export default InspectorContent;
