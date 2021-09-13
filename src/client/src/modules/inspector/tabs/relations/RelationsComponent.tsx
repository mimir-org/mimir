import { ListElement } from "../../styled";
import { RightArrowIcon } from "../../../../assets/icons/common";
import { Project, Node, ConnectorType } from "../../../../models";
import { GetRelationColor } from "../../helpers";
import { TextResources } from "../../../../assets/text";
import {
  RelationsBody,
  RelationsHeader,
  RelationsColumn,
  TerminalList,
} from "./styled";

interface Props {
  project: Project;
  node: Node;
}

const RelationComponent = ({ project, node }: Props) => {
  const terminals = node.connectors?.filter((conn) => conn.visible);

  return (
    <RelationsBody>
      {terminals.length > 0 && (
        <>
          <RelationsColumn>
            <RelationsHeader>
              {TextResources.Inspector_Relations_Active_Terminal_Types}
            </RelationsHeader>
            <TerminalList>
              {terminals?.map((conn, i) => {
                return (
                  <ListElement
                    onClick={() => null}
                    index={i}
                    key={conn.id}
                    color={GetRelationColor(conn)}
                  >
                    {conn.name} {ConnectorType[conn.type]}
                    <img src={RightArrowIcon} alt="icon" className="icon" />
                  </ListElement>
                );
              })}
            </TerminalList>
          </RelationsColumn>
          <RelationsColumn>
            <RelationsHeader>
              {TextResources.Inspector_Relations_Terminal_Input}
            </RelationsHeader>
            <TerminalList>
              {terminals?.map((conn, i) => {
                return (
                  <ListElement
                    onClick={() => null}
                    index={i}
                    key={conn.id}
                    color={GetRelationColor(conn)}
                  >
                    {conn.name} {ConnectorType[conn.type]}
                    <img src={RightArrowIcon} alt="icon" className="icon" />
                  </ListElement>
                );
              })}
            </TerminalList>
          </RelationsColumn>
        </>
      )}
    </RelationsBody>
  );
};
export default RelationComponent;
