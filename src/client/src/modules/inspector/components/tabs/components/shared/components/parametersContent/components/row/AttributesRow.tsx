import { Dispatch } from "redux";
import { CombinedAttribute } from "../../../../../../../../../../models";
import { PARAMETER_ENTITY_WIDTH, AttributeObject } from "./components/AttributeObject";
import { AttributesRowBody, AttributeCombinationHeader, AttributeCombinationContainer } from "./AttributesRow.styled";
import { CombinationDropdown } from "./components/CombinationDropdown";
import { RemoveIconComponent } from "../../../../../../../../../../assets/icons/close";
import { OnChangeFilterChoice } from "../../handlers/OnChangeFilterChoice";
import { OnLockParameter } from "../../handlers/OnLockParameter";
import { useMemo, useState } from "react";
import { GetAttributes } from "../../helpers/GetAttributes";
import { DoesCombinationMatchAttribute } from "../../helpers/GetAttributeCombinations";
import { OnChangeAttributeCombinationChoice } from "../../handlers/OnChangeAttributeCombinationChoice";
import { InspectorElement, InspectorAttributesElement } from "../../../../../../../../types";
import { Attribute } from "@mimirorg/modelbuilder-types";
import {
  projectIdSelector,
  isProjectStateGloballyLockingSelector,
  useAppSelector,
  qunatityDatumSelector,
} from "../../../../../../../../../../redux/store";
import { OnChangeNodeAttributeValue } from "../../handlers/OnChangeAttributeValue";
import { IsNode } from "../../../../../../../../helpers/IsType";

const FILTER_ENTITY_WIDTH = 191;

interface Props {
  element: InspectorAttributesElement;
  inspectorParentElem?: InspectorElement;
  combinations: CombinedAttribute[];
  selectedCombinations: CombinedAttribute[];
  attributeItems?: Attribute[];
  maxNumSelectedCombinations: number;
  username: string;
  filterName: string;
  headerColor: string;
  bodyColor: string;
  dispatch: Dispatch;
}

/**
 * Component for a row to display the combinations of an Attribute horizontally.
 * @param props
 * @returns a row for an Attribute.
 */
export const AttributesRow = ({
  element,
  inspectorParentElem,
  combinations,
  selectedCombinations,
  attributeItems,
  maxNumSelectedCombinations,
  username,
  filterName,
  headerColor,
  bodyColor,
  dispatch,
}: Props) => {
  const projectId = useAppSelector(projectIdSelector);
  const isGlobalLocking = useAppSelector(isProjectStateGloballyLockingSelector);
  const quantityDatums = useAppSelector(qunatityDatumSelector);
  const [lockingAttribute, setLockingAttribute] = useState(null);
  const attributes = attributeItems ?? GetAttributes(element);

  const bodyWidth = useMemo(
    () => maxNumSelectedCombinations * PARAMETER_ENTITY_WIDTH + FILTER_ENTITY_WIDTH,
    [maxNumSelectedCombinations]
  );

  const handleAttributeChange = (attributeId: string, property: string, value: string) => {
    if (IsNode(element)) {
      OnChangeNodeAttributeValue(attributeId, element.id, property, value, dispatch);
    }
  };

  return (
    <>
      {element && (
        <AttributesRowBody width={bodyWidth}>
          <AttributeCombinationContainer>
            <AttributeCombinationHeader color={bodyColor} id="ParametersBox">
              <div className={`icon`}>
                <RemoveIconComponent
                  width={26}
                  height={26}
                  fill={headerColor}
                  stroke={headerColor}
                  onClick={() => OnChangeFilterChoice(element.id, filterName, true, dispatch)}
                />
              </div>
              <div className="text">{filterName}</div>
            </AttributeCombinationHeader>
            <CombinationDropdown
              items={combinations}
              selectedItems={selectedCombinations}
              keyProp="combined"
              onChange={(comb, selected) => OnChangeAttributeCombinationChoice(element.id, filterName, comb, selected, dispatch)}
              headerColor={headerColor}
              bodyColor={bodyColor}
            />
          </AttributeCombinationContainer>
          {selectedCombinations.map((comb) => (
            <AttributeObject
              key={comb.combined}
              attribute={attributes.find((attr) => attr.entity === filterName && DoesCombinationMatchAttribute(comb, attr))}
              headerColor={headerColor}
              bodyColor={bodyColor}
              isGloballyLocking={isGlobalLocking}
              lockingAttribute={lockingAttribute}
              quantityDatums={quantityDatums}
              onChange={(attributeId: string, property: string, value: string) =>
                handleAttributeChange(attributeId, property, value)
              }
              onLock={(attr, isLocked) =>
                OnLockParameter(inspectorParentElem, attr, projectId, isLocked, username, setLockingAttribute, dispatch)
              }
              onClose={() => OnChangeAttributeCombinationChoice(element.id, filterName, comb, true, dispatch)}
            />
          ))}
        </AttributesRowBody>
      )}
    </>
  );
};
