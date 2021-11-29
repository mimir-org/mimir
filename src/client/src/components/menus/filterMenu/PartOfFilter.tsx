import { FilterElement } from ".";
import { TextResources } from "../../../assets/text";
import { Connector, Edge, Node } from "../../../models";
import { OnFilterChange } from "./handlers";
import { GetPartOfName } from "./helpers";
import { SubHeader } from "./styled";

interface Props {
  edges: Edge[];
  nodes: Node[];
  partOfItems: Connector[];
  dispatch: any;
}

/**
 * Component for partOf relations.
 * @param interface
 * @returns checkboxes to toggle partOf relations that exist in Mimir.
 */
const PartOfFilter = ({ edges, nodes, partOfItems, dispatch }: Props) => (
  <>
    <SubHeader>{TextResources.Filter_PartOf}</SubHeader>
    {partOfItems.map((conn) => {
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
