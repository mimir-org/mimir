import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "./styled/dropdown/parameter";
import { CombinedAttributeFilter, Node } from "../../../../models";
import { GetPossibleCombinations } from "./helpers";
import { Menu, Header } from "./styled";
import { OnChangeParameter, OnClearParameters } from "./handlers";
import { FilterDict } from "./redux/types";
import ParameterRow from "./ParameterRow";

interface Props {
  node: Node;
}

const ParametersComponent = ({ node }: Props) => {
  const dispatch = useDispatch();
  const attributes = node.attributes;

  const attributeFilters =
    (
      useSelector<RootState>(
        (state) => state.commonState.filters
      ) as CombinedAttributeFilter[]
    ).filter((x) => attributes.find((att) => att.key === x.name)) ?? [];

  const selectedFilters =
    (useSelector<RootState>(
      (state) => state.parametersReducer.selectedAttributeFilters[node.id]
    ) as FilterDict) ?? {};

  const hasFilters = Object.keys(selectedFilters).length > 0;

  const possibleCombinations = GetPossibleCombinations(
    attributeFilters,
    attributes
  );

  return (
    <>
      <Header>
        <Menu>
          <Dropdown
            onChange={(filter: CombinedAttributeFilter, selected: boolean) => {
              OnChangeParameter(node.id, filter.name, selected, dispatch);
            }}
            items={attributeFilters}
            selectedItems={selectedFilters}
          />
          <div
            className="link"
            onClick={() => OnClearParameters(node.id, dispatch)}
          >
            {TextResources.Inspector_Params_Clear_All}
          </div>
          <div className="link">{TextResources.Inspector_Params_Default}</div>
        </Menu>
      </Header>
      {hasFilters &&
        Object.entries(selectedFilters).map(
          ([filterName, selectedCombinations]) => (
            <ParameterRow
              node={node}
              possibleCombinations={possibleCombinations[filterName]}
              selectedCombinations={selectedCombinations}
              filterName={filterName}
              dispatch={dispatch}
            />
          )
        )}
    </>
  );
};
export default ParametersComponent;
