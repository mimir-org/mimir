import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Connector, Project } from "../../../models";
import { FilterMenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { IsLibrary, IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../flow/helpers";
import { Dropdown } from "./styled/dropdown/";
import { TextResources } from "../../../assets/text";

const FilterMenu = () => {
  const dispatch = useDispatch();
  const project = useSelector<RootState>((s) => s.projectState.project) as Project;
  const libraryOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible) as boolean;
  const edges = project?.edges;

  const transportTerminals = [] as Connector[];
  const transportLabel = TextResources.Relations_Transport;
  const relationsTerminals = [] as Connector[];
  const relationsLabel = TextResources.Relations;
  const partOfTerminals = [] as Connector[];
  const partOfLabel = TextResources.Relations_PartOf_Relationship;

  edges.forEach((e) => {
    if (IsTransportTerminal(e.fromConnector)) transportTerminals.push(e.fromConnector);
    if (IsLocationTerminal(e.fromConnector)) relationsTerminals.push(e.fromConnector);
    if (IsPartOfTerminal(e.fromConnector)) partOfTerminals.push(e.fromConnector);
  });

  return (
    <FilterMenuBox isLibraryOpen={libraryOpen}>
      <MenuColumn>
        <Dropdown terminals={transportTerminals} label={transportLabel} edges={edges} dispatch={dispatch} />
        <Dropdown terminals={relationsTerminals} label={relationsLabel} edges={edges} dispatch={dispatch} />
        <Dropdown terminals={partOfTerminals} label={partOfLabel} edges={edges} dispatch={dispatch} />
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default FilterMenu;
