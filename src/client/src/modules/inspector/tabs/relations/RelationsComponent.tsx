import { Edge, Node } from "../../../../models";
import { RelationsContent } from ".";
import { RelationsBody } from "./styled";
import { TextResources } from "../../../../assets/text";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { OnClickRelation, OnClickTerminal, OnClickTransport } from "./handlers";
import { GetRelations } from "./helpers/GetRelations";
import { GetRelationColor } from "../../helpers";
import { Color } from "../../../../compLibrary";
import {
  GetNameRelation,
  GetNameTerminal,
  GetNameTransport,
} from "./helpers/GetName";
import {
  IsInputTerminal,
  IsOutputTerminal,
} from "../../../../components/flow/helpers/common";

interface Props {
  node: Node;
}

const RelationComponent = ({ node }: Props) => {
  const dispatch = useDispatch();

  const connectors = node.connectors;
  const hasConnectors = connectors.length > 0;

  const edges = useSelector<RootState>(
    (state) => state.projectState.project.edges
  ) as Edge[];

  const [relations, relationEdges] = GetRelations(connectors, edges);

  const inputTerminals = connectors.filter(
    (x) => x.terminalTypeId && IsInputTerminal(x)
  );

  const outputTerminals = connectors.filter(
    (x) => x.terminalTypeId && IsOutputTerminal(x)
  );

  const transports = edges.filter(
    (e) =>
      (e.toNodeId === node.id || e.fromNodeId === node.id) &&
      e.fromConnector.terminalTypeId
  );

  return (
    <RelationsBody>
      {hasConnectors && (
        <>
          <RelationsContent
            items={relations}
            label={TextResources.Inspector_Relations_Relationships}
            getName={(conn) => GetNameRelation(conn, relationEdges)}
            getColor={(conn) => GetRelationColor(conn)}
            onClick={(conn) =>
              OnClickRelation(node, conn, relationEdges, dispatch)
            }
          />
          <RelationsContent
            items={inputTerminals}
            label={TextResources.Inspector_Relations_Terminal_Input}
            getName={GetNameTerminal}
            getColor={(conn) => GetRelationColor(conn)}
            onClick={OnClickTerminal}
          />
          <RelationsContent
            items={outputTerminals}
            label={TextResources.Inspector_Relations_Terminal_Output}
            getName={GetNameTerminal}
            getColor={(conn) => GetRelationColor(conn)}
            onClick={OnClickTerminal}
          />
          <RelationsContent
            items={transports}
            label={TextResources.Inspector_Relations_Transport}
            getName={(edge) => GetNameTransport(edge, node)}
            getColor={(_) => Color.FunctionHeader}
            onClick={(edge) => OnClickTransport(edge, dispatch)}
          />
        </>
      )}
    </RelationsBody>
  );
};
export default RelationComponent;
