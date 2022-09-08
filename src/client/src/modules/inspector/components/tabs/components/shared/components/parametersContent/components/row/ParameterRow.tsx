import { Dispatch } from "redux";
import { CombinedAttribute } from "../../../../../../../../../../models";
import { PARAMETER_ENTITY_WIDTH, Parameter } from "./components/Parameter";
import { Body, Box } from "./ParameterRow.styled";
import { Entity } from "./styled/Entity";
import { CombinationDropdown } from "./components/CombinationDropdown";
import { RemoveIconComponent } from "../../../../../../../../../../assets/icons/close";
import { OnChangeFilterChoice } from "../../handlers/OnChangeFilterChoice";
import { OnChangeParameterValue } from "../../handlers/OnChangeParameterValue";
import { OnLockParameter } from "../../handlers/OnLockParameter";
import { useMemo, useState } from "react";
import { GetAttributes } from "../../helpers/GetAttributes";
import { DoesCombinationMatchAttribute } from "../../helpers/GetAttributeCombinations";
import { OnChangeAttributeCombinationChoice } from "../../handlers/OnChangeAttributeCombinationChoice";
import { InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../../../../../../../types";
import { Attribute } from "@mimirorg/modelbuilder-types";
import {
  projectIdSelector,
  isProjectStateGloballyLockingSelector,
  useAppSelector,
} from "../../../../../../../../../../redux/store";

const FILTER_ENTITY_WIDTH = 191;

interface Props {
  element: InspectorParametersElement;
  inspectorParentElement?: InspectorElement;
  terminalParentElement?: InspectorTerminalsElement;
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

export const ParameterRow = ({
  element,
  inspectorParentElement,
  terminalParentElement,
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
  const [lockingAttribute, setLockingAttribute] = useState(null);
  const attributes = attributeItems ?? GetAttributes(element);

  const bodyWidth = useMemo(
    () => maxNumSelectedCombinations * PARAMETER_ENTITY_WIDTH + FILTER_ENTITY_WIDTH,
    [maxNumSelectedCombinations]
  );

  return (
    <Body width={bodyWidth}>
      <Entity width={FILTER_ENTITY_WIDTH}>
        <Box color={bodyColor} id="ParametersBox">
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
          headerColor={headerColor}
          bodyColor={bodyColor}
          isGloballyLocking={isGlobalLocking}
          lockingAttribute={lockingAttribute}
          onChange={(id, value, unit) =>
            OnChangeParameterValue(element, inspectorParentElement, terminalParentElement, id, value, unit, dispatch)
          }
          onLock={(attribute, isLocked) =>
            OnLockParameter(inspectorParentElement, attribute, projectId, isLocked, username, setLockingAttribute, dispatch)
          }
          onClose={() => OnChangeAttributeCombinationChoice(element.id, filterName, combination, true, dispatch)}
        />
      ))}
    </Body>
  );
};
