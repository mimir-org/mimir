import { ListElement } from "../styled";
import { RightArrowIcon } from "../../../assets/icons/common";
import { Project, Node, ConnectorType } from "../../../models";
import { GetRelationColor } from "../helpers";
import {
  RelationColumns,
  AspectList,
} from "../../../compLibrary/box/inspector";

interface Props {
  project: Project;
  node: Node;
}

const RelationComponent = ({ project, node }: Props) => {
  const activeConnectors = node.connectors?.filter((conn) => conn.visible);

  return (
    <RelationColumns>
      {activeConnectors.length > 0 && (
        <>
          <AspectList>
            {activeConnectors?.map((conn, i) => {
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
          </AspectList>
        </>
      )}
    </RelationColumns>
  );
};
export default RelationComponent;
