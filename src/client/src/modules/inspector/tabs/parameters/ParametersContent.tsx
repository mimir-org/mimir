import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "./styled/dropdown/parameter";
import { CombinedAttributeFilter, Connector, Node } from "../../../../models";
import { GetAttributeCombinations, GetParametersColor } from "./helpers";
import { Menu, Header } from "./styled";
import { OnChangeFilterChoice, OnClearAllFilters } from "./handlers";
import { FilterDict } from "./redux/types";
import { ParameterRow } from "./";
import { useState } from "react";
import ParametersRowWrapper from "./styled/ParametersRowWrapper";

interface Props {
  element: Node | Connector;
  elementIsLocked: boolean;
}

const ParametersContent = ({ element, elementIsLocked }: Props) => {
  const dispatch = useDispatch();
  const attributes = element.attributes;

  const attributeFilters =
    (useSelector<RootState>((state) => state.commonState.filters) as CombinedAttributeFilter[]).filter((x) =>
      attributes.find((att) => att.key === x.name)
    ) ?? [];

  const selectedFilters =
    (useSelector<RootState>((state) => state.parametersReducer.selectedAttributeFilters[element.id]) as FilterDict) ??
    {};

  const hasFilters = Object.keys(selectedFilters).length > 0;
  const attributeCombinations = GetAttributeCombinations(attributeFilters, attributes);

  const [colorMapping] = useState(new Map<string, [string, string]>());

  return (
    <>
      <Header>
        <Menu>
          <Dropdown
            onChange={(filter: CombinedAttributeFilter, selected: boolean) => {
              OnChangeFilterChoice(element.id, filter.name, selected, dispatch);
            }}
            items={attributeFilters}
            selectedItems={selectedFilters}
          />
          <div className="link" onClick={() => OnClearAllFilters(element.id, dispatch)}>
            {TextResources.Inspector_Params_Clear_All}
          </div>
          <div className="link">{TextResources.Inspector_Params_Default}</div>
        </Menu>
      </Header>
      <ParametersRowWrapper>
        {hasFilters &&
          Object.entries(selectedFilters).map(([filterName, selectedCombinations], index) => {
            if (!colorMapping.has(filterName)) colorMapping.set(filterName, GetParametersColor(index));

            let [headerColor, bodyColor] = colorMapping.get(filterName);

            return (
              <ParameterRow
                key={filterName}
                element={element}
                elementIsLocked={elementIsLocked}
                combinations={attributeCombinations[filterName]}
                selectedCombinations={selectedCombinations}
                filterName={filterName}
                headerColor={headerColor}
                bodyColor={bodyColor}
                dispatch={dispatch}
              />
            );
          })}
      </ParametersRowWrapper>
    </>
  );
};
export default ParametersContent;
