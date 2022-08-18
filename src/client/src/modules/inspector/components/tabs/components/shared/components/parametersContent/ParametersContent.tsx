import { TextResources } from "../../../../../../../../assets/text/TextResources";
import { CombinedAttributeFilter } from "../../../../../../../../models";
import { GetAttributeCombinations } from "./helpers/GetAttributeCombinations";
import { GetParametersColor } from "./helpers/GetParametersColor";
import { GetAttributes } from "./helpers/GetAttributes";
import { ParameterButton } from "./styled/ParameterButton";
import { Dropdown } from "./components/dropdown/Dropdown";
import { ParameterRow } from "./components/row/ParameterRow";
import { useMemo, useRef, useState } from "react";
import { OnShowAllFilters } from "./handlers/OnShowAllFilters";
import { OnChangeFilterChoice } from "./handlers/OnChangeFilterChoice";
import { OnClearAllFilters } from "./handlers/OnClearAllFilters";
import { InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../../../../../types";
import { Attribute } from "@mimirorg/modelbuilder-types";
import {
  ParametersContentHeader,
  ParametersContentMenu,
  ParametersContentContainer,
  ParametersRowContainer,
} from "./ParametersContent.styled";
import {
  makeFilterSelector,
  makeSelectedFilterSelector,
  useAppDispatch,
  useAppSelector,
  useUniqueParametricAppSelector,
  usernameSelector,
} from "../../../../../../../../redux/store";

interface Props {
  parametersElement: InspectorParametersElement;
  inspectorParentElement?: InspectorElement;
  terminalParentElement?: InspectorTerminalsElement;
  attributes?: Attribute[];
}

export const ParametersContent = ({ parametersElement, inspectorParentElement, terminalParentElement, attributes }: Props) => {
  const dispatch = useAppDispatch();

  if (attributes == undefined || attributes == null) attributes = GetAttributes(parametersElement);
  const username = useAppSelector(usernameSelector);

  const shouldShowDefaultEntities = useRef(true);
  const attributeFilters = useUniqueParametricAppSelector(makeFilterSelector, attributes);
  const selectedFilters = useUniqueParametricAppSelector(makeSelectedFilterSelector, parametersElement.id);
  const hasFilters = Object.keys(selectedFilters).length > 0;
  const maxNumSelectedCombinations = Math.max(...Object.values(selectedFilters).map((combinations) => combinations.length));
  const [colorMapping] = useState(new Map<string, [string, string]>());

  const attributeCombinations = useMemo(
    () => GetAttributeCombinations(attributeFilters, attributes),
    [attributeFilters, attributes]
  );

  const OnShowAllEntites = () => {
    shouldShowDefaultEntities.current = true;
    OnShowAllFilters(parametersElement.id, attributeFilters, attributeCombinations, dispatch);
  };

  // useEffect(() => {
  //   if (shouldShowDefaultEntities.current) {
  //     OnShowAllFilters(parametersElement.id, attributeFilters, attributeCombinations, dispatch);
  //   }
  // }, [attributeCombinations, attributeFilters, dispatch, parametersElement.id, shouldShowDefaultEntities]);

  return (
    <ParametersContentContainer>
      <ParametersContentHeader>
        <ParametersContentMenu>
          <Dropdown
            onChange={(filter: CombinedAttributeFilter, selected: boolean) => {
              OnChangeFilterChoice(parametersElement.id, filter.name, selected, dispatch);
            }}
            items={attributeFilters}
            selectedItems={selectedFilters}
          />

          <ParameterButton className={`link`} onClick={() => OnClearAllFilters(parametersElement.id, dispatch)}>
            {TextResources.PARAMS_CLEAR_ALL}
          </ParameterButton>
          <ParameterButton className={`link`} onClick={OnShowAllEntites}>
            {TextResources.PARAMS_DEFAULT}
          </ParameterButton>
        </ParametersContentMenu>
      </ParametersContentHeader>
      <ParametersRowContainer>
        {hasFilters &&
          Object.entries(selectedFilters).map(([filterName, selectedCombinations], index) => {
            if (!colorMapping.has(filterName)) colorMapping.set(filterName, GetParametersColor(index));

            const [headerColor, bodyColor] = colorMapping.get(filterName);

            return (
              <ParameterRow
                key={filterName}
                element={parametersElement}
                inspectorParentElement={inspectorParentElement}
                terminalParentElement={terminalParentElement}
                combinations={attributeCombinations[filterName]}
                selectedCombinations={selectedCombinations}
                attributes={attributes}
                maxNumSelectedCombinations={maxNumSelectedCombinations}
                username={username}
                filterName={filterName}
                headerColor={headerColor}
                bodyColor={bodyColor}
                dispatch={dispatch}
              />
            );
          })}
      </ParametersRowContainer>
    </ParametersContentContainer>
  );
};
