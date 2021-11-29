import { FilterElement } from ".";
import { TextResources } from "../../../assets/text";
import { Connector, Edge } from "../../../models";
import { OnFilterChange } from "./handlers";
import { SubHeader } from "./styled";

interface Props {
  edges: Edge[];
  relationItems: Connector[];
  dispatch: any;
}

/**
 * Component for relations filter.
 * @param interface
 * @returns checkboxes to toggle relations that exist in Mimir.
 */
const RelationFilter = ({ edges, relationItems, dispatch }: Props) => (
  <>
    <SubHeader>{TextResources.Filter_Relations}</SubHeader>
    {relationItems.map((conn) => {
      const edge = edges.find((x) => x.fromConnectorId === conn.id);
      return (
        <FilterElement
          key={conn.id}
          label={conn.name}
          onChange={() => OnFilterChange(edge, edges, dispatch)}
          isChecked={!edge.isHidden}
          visible={true}
        />
      );
    })}
  </>
);

export default RelationFilter;
