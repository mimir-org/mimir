import { RelationsContent } from "./components/RelationsContent";
import { RelationsBody } from "./RelationsComponent.styled";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { edgeSelector, useAppSelector } from "../../../../../../redux/store";
import { InspectorElement } from "../../../../types";
import { IsEdge, IsNode } from "../../../../helpers/IsType";
import { useMemo } from "react";
import { useSelectFlowElements } from "../../../../../../helpers";
import { GetConnectors } from "./helpers/GetConnectors";
import { GetTerminals, GetTransports } from "./helpers/GetTerminals";
import { OnClickNode } from "./handlers/OnClickNode";
import { OnClickRelation } from "./handlers/OnClickRelation";
import { OnClickTerminal } from "./handlers/OnClickTerminal";
import { OnClickTransport } from "./handlers/OnClickTransport";
import { GetRelations } from "./helpers/GetRelations";
import { GetNameNode, GetNameRelation, GetNameTerminal, GetNameTransport } from "./helpers/GetName";
import { GetActiveRelationColor, GetListItemColor } from "./helpers/GetColor";

interface Props {
  element: InspectorElement;
}

export const RelationsComponent = ({ element }: Props) => {
  const edges = useAppSelector(edgeSelector);
  const connectors = useMemo(() => GetConnectors(element), [element]);
  const [inputTerminals, outputTerminals] = useMemo(() => GetTerminals(connectors, edges), [connectors, edges]);
  const transports = useMemo(() => GetTransports(edges, element), [edges, element]);
  const [setActiveNodeElement, setActiveEdgeElement] = useSelectFlowElements();

  const hasConnectors = connectors.length > 0;

  return (
    <RelationsBody>
      {hasConnectors && (
        <>
          {IsNode(element) && (
            <RelationsContent
              items={GetRelations(element, edges)}
              label={TextResources.INSPECTOR_RELATIONS_RELATIONSHIPS}
              getName={(edge) => GetNameRelation(edge, element)}
              getColor={(edge, index) => GetActiveRelationColor(edge.fromConnector, index)}
              onClick={(edge) => OnClickRelation(element, edge, setActiveNodeElement)}
            />
          )}
          <RelationsContent
            items={inputTerminals}
            label={TextResources.INSPECTOR_RELATIONS_TERMINAL_INPUT}
            getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          <RelationsContent
            items={outputTerminals}
            label={TextResources.INSPECTOR_RELATIONS_TERMINAL_OUTPUT}
            getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          {IsNode(element) && (
            <RelationsContent
              items={transports}
              label={TextResources.INSPECTOR_RELATIONS_TRANSPORT}
              getName={(edge) => GetNameTransport(edge, element)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(edge) => OnClickTransport(edge, setActiveEdgeElement)}
            />
          )}
          {IsEdge(element) && (
            <RelationsContent
              items={[element.fromNode, element.toNode]}
              label={TextResources.INSPECTOR_RELATIONS_NODES}
              getName={(node) => GetNameNode(element, node)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(node) => OnClickNode(node, setActiveNodeElement)}
            />
          )}
        </>
      )}
    </RelationsBody>
  );
};
