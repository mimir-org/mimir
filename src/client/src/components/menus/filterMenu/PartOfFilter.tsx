import { FilterElement } from ".";
import { TextResources } from "../../../assets/text";
import { Connector, Edge, Node } from "../../../models";
import { OnFilterChange } from "./handlers";
import { GetPartOfName } from "./helpers";

interface Props {
  edges: Edge[];
  nodes: Node[];
  items: Connector[];
  dispatch: any;
  visible: boolean;
}

/**
 * Component for partOf relations.
 * @param interface
 * @returns checkboxes to toggle partOf relations that exist in Mimir.
 */
const PartOfFilter = ({ edges, nodes, items, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.Filter_PartOf}
        onChange={() => null}
        isChecked={true}
        isHeader={true}
        visible={visible}
      />
      {items.map((conn) => {
        const edge = edges.find((x) => x.fromConnectorId === conn.id);
        const node = nodes.find((n) => n.id === conn.nodeId);
        const name = GetPartOfName(conn, node);

        return (
          <FilterElement
            key={conn.id}
            label={name}
            onChange={() => OnFilterChange(edge, edges, dispatch)}
            isChecked={!edge.isHidden}
            visible={true}
          />
        );
      })}
    </>
  );

export default PartOfFilter;
