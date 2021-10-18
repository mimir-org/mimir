import { Edge } from "../../../../models";
import { RelationsContent } from ".";
import { RelationsBody } from "./styled";
import { TextResources } from "../../../../assets/text";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { OnClickNode, OnClickRelation, OnClickTerminal, OnClickTransport } from "./handlers";
import { GetRelations } from "./helpers/GetRelations";
import { InspectorElement } from "../../types";
import { IsEdge, IsNode } from "../../helpers/IsType";
import {
  GetTransports,
  GetConnectors,
  GetNameRelation,
  GetNameTerminal,
  GetNameTransport,
  GetTerminals,
  GetNameNode,
  GetActiveRelationColor,
  GetListItemColor,
} from "./helpers";

interface Props {
  element: InspectorElement;
}

const RelationComponent = ({ element }: Props) => {
  const dispatch = useDispatch();

  const edges = useSelector<RootState>((state) => state.projectState.project.edges) as Edge[];

  const connectors = GetConnectors(element);
  const hasConnectors = connectors.length > 0;
  const [inputTerminals, outputTerminals] = GetTerminals(connectors, edges);
  const transports = GetTransports(edges, element);

  return (
    <RelationsBody>
      {hasConnectors && (
        <>
          {IsNode(element) && (
            <RelationsContent
              items={GetRelations(element, edges)}
              label={TextResources.Inspector_Relations_Relationships}
              getName={(edge) => GetNameRelation(edge, element)}
              getColor={(edge, index) => GetActiveRelationColor(edge.fromConnector, index)}
              onClick={(edge) => OnClickRelation(element, edge, dispatch)}
            />
          )}
          <RelationsContent
            items={inputTerminals}
            label={TextResources.Inspector_Relations_Terminal_Input}
            getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          <RelationsContent
            items={outputTerminals}
            label={TextResources.Inspector_Relations_Terminal_Output}
            getName={(terminal) => GetNameTerminal(terminal, transports)}
            getColor={(_, index) => GetListItemColor(index)}
            onClick={OnClickTerminal}
          />
          {IsNode(element) && (
            <RelationsContent
              items={transports}
              label={TextResources.Inspector_Relations_Transport}
              getName={(edge) => GetNameTransport(edge, element)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(edge) => OnClickTransport(edge, dispatch)}
            />
          )}
          {IsEdge(element) && (
            <RelationsContent
              items={[element.fromNode, element.toNode]}
              label={TextResources.Inspector_Relations_Nodes}
              getName={(node) => GetNameNode(element, node)}
              getColor={(_, index) => GetListItemColor(index)}
              onClick={(node) => OnClickNode(node, dispatch)}
            />
          )}
        </>
      )}
    </RelationsBody>
  );
};
export default RelationComponent;
