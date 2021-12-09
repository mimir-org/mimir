import { Dispatch } from "redux";
import { CombinedAttribute, Project } from "../../../../models";
import { Parameter, PARAMETER_ENTITY_WIDTH } from "./";
import { DoesCombinationMatchAttribute } from "./helpers";
import { Body, Entity, Box } from "./styled";
import { CombinationDropdown } from "./CombinationDropdown";
import { RemoveIconComponent } from "../../../../assets/icons/close";
import { OnChangeParameterValue, OnChangeFilterChoice, OnLockParameter, OnChangeAttributeCombinationChoice } from "./handlers";
import { useMemo } from "react";
import { AttributeLikeItem, InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../types";
import { GetAttributes } from "./helpers/GetAttributes";
import { IsCreateLibraryType } from "../../helpers/IsType";

const FILTER_ENTITY_WIDTH: number = 191;

interface Props {
  element: InspectorParametersElement;
  elementIsLocked: boolean;
  inspectorParentElement?: InspectorElement;
  terminalParentElement?: InspectorTerminalsElement;
  project: Project;
  combinations: CombinedAttribute[];
  selectedCombinations: CombinedAttribute[];
  attributeLikeItems?: AttributeLikeItem[];
  maxNumSelectedCombinations: number;
  username: string;
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
  project,
  combinations,
  selectedCombinations,
  attributeLikeItems,
  maxNumSelectedCombinations,
  username,
  filterName,
  headerColor,
  bodyColor,
  dispatch,
}: Props) {
  const attributes = attributeLikeItems ?? GetAttributes(element);
  const isCreateLibraryType = IsCreateLibraryType(inspectorParentElement);

  const bodyWidth = useMemo(
    () => maxNumSelectedCombinations * PARAMETER_ENTITY_WIDTH + FILTER_ENTITY_WIDTH,
    [maxNumSelectedCombinations]
  );

  return (
    <>
      <Body width={bodyWidth}>
        <Entity width={FILTER_ENTITY_WIDTH}>
          <Box color={bodyColor} id="ParametersBox">
            <div className={`icon ${isCreateLibraryType && "hide-icon"}`}>
              <RemoveIconComponent
                width={26}
                height={26}
                fill={headerColor}
                stroke={headerColor}
                onClick={() => !isCreateLibraryType && OnChangeFilterChoice(element.id, filterName, true, dispatch)}
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
            attribute={attributes.find((attr) => attr.entity === filterName && DoesCombinationMatchAttribute(combination, attr))}
            combination={combination}
            isNodeLocked={elementIsLocked}
            headerColor={headerColor}
            bodyColor={bodyColor}
            onChange={(id, value, unit) =>
              OnChangeParameterValue(element, inspectorParentElement, terminalParentElement, id, value, unit?.id, dispatch)
            }
            onLock={(attribute, isLocked) =>
              OnLockParameter(
                element,
                inspectorParentElement,
                terminalParentElement,
                project,
                attribute,
                isLocked,
                username,
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
