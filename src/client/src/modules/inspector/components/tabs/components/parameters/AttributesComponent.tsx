import { InspectorElement, InspectorAttributesElement, InspectorTerminalsElement } from "../../../../types";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { GetAttributes } from "../shared/components/parametersContent/helpers/GetAttributes";
import { useEffect, useMemo, useRef, useState } from "react";
import { OnShowAllFilters } from "../shared/components/parametersContent/handlers/OnShowAllFilters";
import { CombinedAttributeFilter } from "../../../../../../models";
import { GetParametersColor } from "../shared/components/parametersContent/helpers/GetParametersColor";
import { AttributesRow } from "../shared/components/parametersContent/components/row/AttributesRow";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { OnClearAllFilters } from "../shared/components/parametersContent/handlers/OnClearAllFilters";
import { AttributeButton } from "../shared/components/parametersContent/styled/AttributeButton";
import { OnChangeFilterChoice } from "../shared/components/parametersContent/handlers/OnChangeFilterChoice";
import { Dropdown } from "../shared/components/parametersContent/components/dropdown/Dropdown";
import { AttributesBox, AttributesHeader, AttributesMenu, AttributesRowBox } from "./AttributesComponent.styled";
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
  attributesElem: InspectorAttributesElement;
  inspectorParentElem: InspectorElement;
  attributeItems?: Attribute[];
  terminalParentElem?: InspectorTerminalsElement;
}

/**
 * Component for the Attributes in the Inspector. This component is used in the Attributes tab,
 * but also under Terminals to display a Terminal's attributes, and under SimpleTypes for Product nodes.
 * @param props
 * @returns a drop-down menu to select combinations of attributes, and buttons for hiding/showing all entities.
 */
export const AttributesComponent = ({ attributesElem, inspectorParentElem, attributeItems, terminalParentElem }: Props) => {
  const dispatch = useAppDispatch();
  const attributes = attributeItems ?? GetAttributes(attributesElem);
  const username = useAppSelector(usernameSelector);
  const shouldShowDefaultEntities = useRef(true);
  const attributeFilters = GetCombinedAttributeFilters(attributes);
  const selectedFilters = useUniqueParametricAppSelector(makeSelectedFilterSelector, attributesElem?.id);
  const hasFilters = Object.keys(selectedFilters).length > 0;
  const maxNumSelectedCombinations = Math.max(...Object.values(selectedFilters).map((combinations) => combinations.length));
  const [colorMapping] = useState(new Map<string, [string, string]>());

  const attributeCombinations = useMemo(
    () => GetAttributeCombinations(attributeFilters, attributes),
    [attributeFilters, attributes]
  );

  const OnShowAllEntites = () => {
    shouldShowDefaultEntities.current = true;
    OnShowAllFilters(attributesElem.id, attributeFilters, attributeCombinations, dispatch);
  };

  useEffect(() => {
    OnShowAllEntites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributesElem]);

  return (
    <AttributesBox>
      <AttributesHeader>
        <AttributesMenu>
          <Dropdown
            onChange={(filter: CombinedAttributeFilter, selected: boolean) => {
              OnChangeFilterChoice(attributesElem.id, filter.name, selected, dispatch);
            }}
            items={attributeFilters}
            selectedItems={selectedFilters}
          />

          <AttributeButton className={`link`} onClick={() => OnClearAllFilters(attributesElem.id, dispatch)}>
            {TextResources.PARAMS_CLEAR_ALL}
          </AttributeButton>
          <AttributeButton className={`link`} onClick={OnShowAllEntites}>
            {TextResources.PARAMS_DEFAULT}
          </AttributeButton>
        </AttributesMenu>
      </AttributesHeader>

      <AttributesRowBox>
        {hasFilters &&
          Object.entries(selectedFilters).map(([filterName, selectedCombinations], index) => {
            if (!colorMapping.has(filterName)) colorMapping.set(filterName, GetParametersColor(index));
            const [headerColor, bodyColor] = colorMapping.get(filterName);

            return (
              <AttributesRow
                key={filterName}
                element={attributesElem}
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
      </AttributesRowBox>
    </AttributesBox>
  );
};
