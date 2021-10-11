import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "./styled/dropdown/parameter";
import { CombinedAttributeFilter, Composite, Connector, Node } from "../../../../models";
import { GetAttributeCombinations, GetParametersColor } from "./helpers";
import { Menu, Header, ParametersRowWrapper, ParametersContentWrapper } from "./styled";
import { OnChangeFilterChoice, OnClearAllFilters } from "./handlers";
import { FilterDict } from "./redux/types";
import { ParameterRow } from "./";
import { useState } from "react";

interface Props {
  element: Node | Connector | Composite;
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

  const maxNumSelectedCombinations = Math.max(
    ...Object.values(selectedFilters).map((combinations) => combinations.length)
  );

  const [colorMapping] = useState(new Map<string, [string, string]>());

  return (
    <ParametersContentWrapper>
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
        <hr />
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
                maxNumSelectedCombinations={maxNumSelectedCombinations}
                filterName={filterName}
                headerColor={headerColor}
                bodyColor={bodyColor}
                dispatch={dispatch}
              />
            );
          })}
      </ParametersRowWrapper>
    </ParametersContentWrapper>
  );
};
export default ParametersContent;
