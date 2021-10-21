import { TextResources } from "../../../../assets/text";
import { Dropdown } from "./styled/dropdown/parameter";
import { CombinedAttributeFilter } from "../../../../models";
import { GetAttributeCombinations, GetParametersColor } from "./helpers";
import { Menu, Header, ParametersRowWrapper, ParametersContentWrapper } from "./styled";
import { OnChangeFilterChoice, OnClearAllFilters, OnShowAllFilters, OnIsCreateLibraryType } from "./handlers";
import { ParameterRow } from "./";
import { useEffect, useMemo, useState } from "react";
import { AttributeLikeItem, InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../types";
import {
  useAppDispatch,
  useUniqueParametricAppSelector,
  makeFilterSelector,
  makeSelectedFilterSelector,
} from "../../../../redux/store";
import { GetAttributes } from "./helpers/GetAttributes";
import { IsCreateLibraryType } from "../../helpers/IsType";

interface Props {
  parametersElement: InspectorParametersElement;
  inspectorParentElement?: InspectorElement;
  terminalParentElement?: InspectorTerminalsElement;
  elementIsLocked: boolean;
  attributeLikeItems?: AttributeLikeItem[];
}

const ParametersContent = ({
  parametersElement,
  inspectorParentElement,
  terminalParentElement,
  elementIsLocked,
  attributeLikeItems,
}: Props) => {
  const dispatch = useAppDispatch();

  const attributes = attributeLikeItems ?? GetAttributes(parametersElement);

  const attributeFilters = useUniqueParametricAppSelector(makeFilterSelector, attributes);
  const selectedFilters = useUniqueParametricAppSelector(makeSelectedFilterSelector, parametersElement.id);
  const hasFilters = Object.keys(selectedFilters).length > 0;
  const attributeCombinations = useMemo(
    () => GetAttributeCombinations(attributeFilters, attributes),
    [attributeFilters, attributes]
  );

  useEffect(() => {
    IsCreateLibraryType(parametersElement) &&
      OnIsCreateLibraryType(parametersElement, attributeFilters, selectedFilters, attributeCombinations, dispatch);
  }, [parametersElement, attributeFilters, selectedFilters, attributeCombinations, dispatch]);

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
              OnChangeFilterChoice(parametersElement.id, filter.name, selected, dispatch);
            }}
            items={attributeFilters}
            selectedItems={selectedFilters}
          />
          <div className="link" onClick={() => OnClearAllFilters(parametersElement.id, dispatch)}>
            {TextResources.Inspector_Params_Clear_All}
          </div>
          <div className="link" onClick={() => OnShowAllFilters(parametersElement.id, attributeFilters, dispatch)}>
            {TextResources.Inspector_Params_Default}
          </div>
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
                element={parametersElement}
                elementIsLocked={elementIsLocked}
                inspectorParentElement={inspectorParentElement}
                terminalParentElement={terminalParentElement}
                combinations={attributeCombinations[filterName]}
                selectedCombinations={selectedCombinations}
                attributeLikeItems={attributeLikeItems}
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
