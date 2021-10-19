import { TerminalsComponent } from "./tabs/terminals";
import { RelationsComponent } from "./tabs/relations";
import { ParametersComponent } from "./tabs/parameters";
import { SimpleTypesComponent } from "./tabs/simpleTypes";
import { InspectorElement } from "./types";
import { IsNode } from "./helpers/IsType";

interface Props {
  element: InspectorElement;
  index: number;
}

const InspectorContent = ({ element, index }: Props) => (
  <>
    {index === 1 && <ParametersComponent element={element} />}
    {index === 2 && <TerminalsComponent element={element} />}
    {index === 3 && <RelationsComponent element={element} />}
    {index === 4 && IsNode(element) && <SimpleTypesComponent node={element} />}
  </>
);

export default InspectorContent;
