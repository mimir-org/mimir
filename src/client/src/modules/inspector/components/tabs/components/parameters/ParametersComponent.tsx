import { InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../../../types";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { GetAttributes } from "../shared/components/parametersContent/helpers/GetAttributes";
import { useEffect, useMemo, useRef, useState } from "react";
import { OnShowAllFilters } from "../shared/components/parametersContent/handlers/OnShowAllFilters";
import { CombinedAttributeFilter } from "../../../../../../models";
import { GetParametersColor } from "../shared/components/parametersContent/helpers/GetParametersColor";
import { ParameterRow } from "../shared/components/parametersContent/components/row/ParameterRow";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { OnClearAllFilters } from "../shared/components/parametersContent/handlers/OnClearAllFilters";
import { ParameterButton } from "../shared/components/parametersContent/styled/ParameterButton";
import { OnChangeFilterChoice } from "../shared/components/parametersContent/handlers/OnChangeFilterChoice";
import { Dropdown } from "../shared/components/parametersContent/components/dropdown/Dropdown";
import { ParametersBox, ParametersHeader, ParametersMenu, ParametersRowBox } from "./ParametersComponent.styled";
import {
  GetAttributeCombinations,
  GetCombinedAttributeFilters,
} from "../shared/components/parametersContent/helpers/GetAttributeCombinations";
import {
  makeSelectedFilterSelector,
  useAppDispatch,
  useAppSelector,
  usernameSelector,
  useUniqueParametricAppSelector,
} from "../../../../../../redux/store";

interface Props {
  parametersElem: InspectorParametersElement;
  inspectorParentElem: InspectorElement;
  attributeItems?: Attribute[];
  terminalParentElem?: InspectorTerminalsElement;
}

/**
 * Component for the Parameters in the Inspector. This component is used in the Parameters tab,
 * but also under Terminals to display a Terminal's parameters, and under SimpleTypes for Product nodes.
 * @param params
 * @returns a drop-down menu to select parameters, and buttons for hiding/showing all entities.
 */
export const ParametersComponent = ({ parametersElem, inspectorParentElem, attributeItems, terminalParentElem }: Props) => {
  const dispatch = useAppDispatch();
  const attributes = attributeItems ?? GetAttributes(parametersElem);
  const username = useAppSelector(usernameSelector);
  const shouldShowDefaultEntities = useRef(true);
  const attributeFilters = GetCombinedAttributeFilters(attributes);
  const selectedFilters = useUniqueParametricAppSelector(makeSelectedFilterSelector, parametersElem?.id);
  const hasFilters = Object.keys(selectedFilters).length > 0;
  const maxNumSelectedCombinations = Math.max(...Object.values(selectedFilters).map((combinations) => combinations.length));
  const [colorMapping] = useState(new Map<string, [string, string]>());

  const attributeCombinations = useMemo(
    () => GetAttributeCombinations(attributeFilters, attributes),
    [attributeFilters, attributes]
  );

  const OnShowAllEntites = () => {
    shouldShowDefaultEntities.current = true;
    OnShowAllFilters(parametersElem.id, attributeFilters, attributeCombinations, dispatch);
  };

  useEffect(() => {
    OnShowAllEntites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametersElem]);

  return (
    <ParametersBox>
      <ParametersHeader>
        <ParametersMenu>
          <Dropdown
            onChange={(filter: CombinedAttributeFilter, selected: boolean) => {
              OnChangeFilterChoice(parametersElem.id, filter.name, selected, dispatch);
            }}
            items={attributeFilters}
            selectedItems={selectedFilters}
          />

          <ParameterButton className={`link`} onClick={() => OnClearAllFilters(parametersElem.id, dispatch)}>
            {TextResources.PARAMS_CLEAR_ALL}
          </ParameterButton>
          <ParameterButton className={`link`} onClick={OnShowAllEntites}>
            {TextResources.PARAMS_DEFAULT}
          </ParameterButton>
        </ParametersMenu>
      </ParametersHeader>

      <ParametersRowBox>
        {hasFilters &&
          Object.entries(selectedFilters).map(([filterName, selectedCombinations], index) => {
            if (!colorMapping.has(filterName)) colorMapping.set(filterName, GetParametersColor(index));
            const [headerColor, bodyColor] = colorMapping.get(filterName);

            return (
              <ParameterRow
                key={filterName}
                element={parametersElem}
                inspectorParentElem={inspectorParentElem}
                terminalParentElem={terminalParentElem}
                combinations={attributeCombinations[filterName]}
                selectedCombinations={selectedCombinations}
                attributeItems={attributes}
                maxNumSelectedCombinations={maxNumSelectedCombinations}
                username={username}
                filterName={filterName}
                headerColor={headerColor}
                bodyColor={bodyColor}
                dispatch={dispatch}
              />
            );
          })}
      </ParametersRowBox>
    </ParametersBox>
  );
};
