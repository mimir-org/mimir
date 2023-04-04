import { RelationsContent } from "./components/RelationsContent";
import { RelationsBody } from "./RelationsComponent.styled";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { edgesSelector } from "../../../../../../redux/store";
import { useAppSelector } from "store";
import { InspectorElement } from "../../../../types";
import { useMemo } from "react";
import { OnClickRelation, OnClickTransport, OnClickNode, OnClickTerminal } from "./handlers/OnRelationsClick";

import { useStoreApi } from "react-flow-renderer";
import { AspectObject, Connection } from "lib";

interface Props {
  element: InspectorElement;
}

export const RelationsComponent = ({ element }: Props) => {
  // const edges = useAppSelector(edgesSelector);
  // const connectors = useMemo(() => GetConnectors(element), [element]);
  // const [inputTerminals, outputTerminals] = useMemo(() => GetTerminals(connectors, edges), [connectors, edges]);
  // const setSelectedNodes = useStoreApi().getState().addSelectedNodes;
  // const setSelectedEdges = useStoreApi().getState().addSelectedEdges;
  // const hasConnectors = connectors.length > 0;

  return (
    <RelationsBody>
      {/* {hasConnectors && (
        <>
          {element instanceof AspectObject && (
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
            // getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          <RelationsContent
            items={outputTerminals}
            label={TextResources.RELATIONS_TERMINAL_OUTPUT}
            // getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          {element instanceof AspectObject && (
            <RelationsContent
              items={transports}
              label={TextResources.RELATIONS_TRANSPORT}
              getName={(edge) => GetNameTransport(edge, element)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(edge) => OnClickTransport(edge, setSelectedEdges)}
            />
          )}
          {element instanceof Connection && (
            <RelationsContent
              items={[element.fromConnector, element.toConnector]} // TODO: This was from node - tonode
              label={TextResources.RELATIONS_NODES}
              getName={(node) => GetNameNode(element, node)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(node) => OnClickNode(node, setSelectedNodes)}
            />
          )}
        </>
      )} */}
    </RelationsBody>
  );
};
