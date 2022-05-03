import { RelationsContent } from "./components/RelationsContent";
import { RelationsBody } from "./RelationsComponent.styled";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { edgeSelector, useAppSelector } from "../../../../../../redux/store";
import { InspectorElement } from "../../../../types";
import { IsEdge, IsNode } from "../../../../helpers/IsType";
import { useMemo } from "react";
import { GetConnectors } from "./helpers/GetConnectors";
import { GetTerminals, GetTransports } from "./helpers/GetTerminals";
import { OnClickRelation, OnClickTransport, OnClickNode, OnClickTerminal } from "./handlers/OnRelationsClick";
import { GetRelations } from "./helpers/GetRelations";
import { GetNameNode, GetNameRelation, GetNameTerminal, GetNameTransport } from "./helpers/GetName";
import { GetActiveRelationColor, GetListItemColor } from "./helpers/GetColor";
import { useStoreApi } from "react-flow-renderer";

interface Props {
  element: InspectorElement;
}

export const RelationsComponent = ({ element }: Props) => {
  const edges = useAppSelector(edgeSelector);
  const connectors = useMemo(() => GetConnectors(element), [element]);
  const [inputTerminals, outputTerminals] = useMemo(() => GetTerminals(connectors, edges), [connectors, edges]);
  const transports = useMemo(() => GetTransports(edges, element), [edges, element]);
  const setSelectedNodes = useStoreApi().getState().addSelectedNodes;
  const setSelectedEdges = useStoreApi().getState().addSelectedEdges;

  const hasConnectors = connectors.length > 0;

  return (
    <RelationsBody>
      {hasConnectors && (
        <>
          {IsNode(element) && (
            <RelationsContent
              items={GetRelations(element, edges)}
              label={TextResources.RELATIONS_RELATIONSHIPS}
              getName={(edge) => GetNameRelation(edge, element)}
              getColor={(edge, index) => GetActiveRelationColor(edge.fromConnector, index)}
              onClick={(edge) => OnClickRelation(element, edge, setSelectedNodes)}
            />
          )}
          <RelationsContent
            items={inputTerminals}
            label={TextResources.RELATIONS_TERMINAL_INPUT}
            getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          <RelationsContent
            items={outputTerminals}
            label={TextResources.RELATIONS_TERMINAL_OUTPUT}
            getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          {IsNode(element) && (
            <RelationsContent
              items={transports}
              label={TextResources.RELATIONS_TRANSPORT}
              getName={(edge) => GetNameTransport(edge, element)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(edge) => OnClickTransport(edge, setSelectedEdges)}
            />
          )}
          {IsEdge(element) && (
            <RelationsContent
              items={[element.fromNode, element.toNode]}
              label={TextResources.RELATIONS_NODES}
              getName={(node) => GetNameNode(element, node)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(node) => OnClickNode(node, setSelectedNodes)}
            />
          )}
        </>
      )}
    </RelationsBody>
  );
};
