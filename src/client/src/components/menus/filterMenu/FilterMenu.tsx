import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FilterContent } from ".";
import { Connector, Edge, Project } from "../../../models";
import { FilterMenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { IsLibrary, IsTransportTerminal } from "../../flow/helpers";

const FilterMenu = () => {
  const project = useSelector<RootState>((s) => s.projectState.project) as Project;
  const libraryOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible) as boolean;
  const edges = project?.edges;

  // All transport edges/terminals
  const transportEdges = [] as Edge[];
  const transportTerminals = [] as Connector[];

  edges.forEach((edge) => {
    if (IsTransportTerminal(edge.fromConnector)) {
      transportEdges.push(edge);
      transportTerminals.push(edge.fromConnector);
    }
  });

  return (
    <FilterMenuBox isLibraryOpen={libraryOpen}>
      <MenuColumn>
        {transportTerminals.map((conn) => {
          return (
            <div key={conn.id}>
              <br></br>
              <FilterContent conn={conn} edges={transportEdges} />
            </div>
          );
        })}
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default FilterMenu;
