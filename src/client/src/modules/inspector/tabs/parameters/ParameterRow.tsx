import { Dispatch } from "redux";
import { CombinedAttribute } from "../../../../models";
import { Parameter, PARAMETER_ENTITY_WIDTH } from "./";
import { DoesCombinationMatchAttribute } from "./helpers";
import { Body, Entity, Box } from "./styled";
import { CombinationDropdown } from "./CombinationDropdown";
import { RemoveIconComponent } from "../../../../assets/icons/close";
import {
  OnChangeParameterValue,
  OnChangeFilterChoice,
  OnLockParameter,
  OnChangeAttributeCombinationChoice,
} from "./handlers";
import { useMemo } from "react";
import { InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../types";

const FILTER_ENTITY_WIDTH: number = 191;

interface Props {
  element: InspectorParametersElement;
  elementIsLocked: boolean;
  inspectorParentElement?: InspectorElement;
  terminalParentElement?: InspectorTerminalsElement;
  combinations: CombinedAttribute[];
  selectedCombinations: CombinedAttribute[];
  maxNumSelectedCombinations: number;
  filterName: string;
  headerColor: string;
  bodyColor: string;
  dispatch: Dispatch;
}

function ParameterRow({
  element,
  elementIsLocked,
  inspectorParentElement,
  terminalParentElement,
  combinations,
  selectedCombinations,
  maxNumSelectedCombinations,
  filterName,
  headerColor,
  bodyColor,
  dispatch,
}: Props) {
  const attributes = element.attributes;

  const bodyWidth = useMemo(
    () => maxNumSelectedCombinations * PARAMETER_ENTITY_WIDTH + FILTER_ENTITY_WIDTH,
    [maxNumSelectedCombinations]
  );

  return (
    <>
      <Body width={bodyWidth}>
        <Entity width={FILTER_ENTITY_WIDTH}>
          <Box color={bodyColor} id="ParametersBox">
            <div className="icon">
              <RemoveIconComponent
                width={26}
                height={26}
                fill={headerColor}
                stroke={headerColor}
                onClick={() => OnChangeFilterChoice(element.id, filterName, true, dispatch)}
              />
            </div>
            <div className="text">{filterName}</div>
          </Box>
          <CombinationDropdown
            items={combinations}
            selectedItems={selectedCombinations}
            keyProp="combined"
            onChange={(combination, selected) =>
              OnChangeAttributeCombinationChoice(element.id, filterName, combination, selected, dispatch)
            }
            headerColor={headerColor}
            bodyColor={bodyColor}
          />
        </Entity>
        {selectedCombinations.map((combination) => (
          <Parameter
            key={combination.combined}
            attribute={attributes.find(
              (attr) => attr.key === filterName && DoesCombinationMatchAttribute(combination, attr)
            )}
            combination={combination}
            isNodeLocked={elementIsLocked}
            headerColor={headerColor}
            bodyColor={bodyColor}
            onChange={(id, value, unit) =>
              OnChangeParameterValue(
                element,
                inspectorParentElement,
                terminalParentElement,
                id,
                value,
                unit?.id,
                dispatch
              )
            }
            onLock={(attribute, isLocked) =>
              OnLockParameter(
                element,
                inspectorParentElement,
                terminalParentElement,
                attribute,
                isLocked,
                elementIsLocked,
                dispatch
              )
            }
            onClose={() => OnChangeAttributeCombinationChoice(element.id, filterName, combination, true, dispatch)}
          />
        ))}
      </Body>
    </>
  );
}

export default ParameterRow;
