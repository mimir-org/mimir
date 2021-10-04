import { Dispatch } from "redux";
import { CloseParameterFilterIconComponent } from "../../../../assets/icons/common";
import { CombinedAttribute, Connector, Node } from "../../../../models";
import { DoesCombinationMatchAttribute } from "./helpers";
import Parameter from "./Parameter";
import { Body, Entity, Box } from "./styled";
import { CombinationDropdown } from "./styled/dropdown/combination";
import {
  OnChangeParameterValue,
  OnChangeFilterChoice,
  OnLockParameter,
  OnChangeAttributeCombinationChoice,
} from "./handlers";

type Element = Node | Connector;

interface Props {
  element: Element;
  elementIsLocked: boolean;
  combinations: CombinedAttribute[];
  selectedCombinations: CombinedAttribute[];
  filterName: string;
  headerColor: string;
  bodyColor: string;
  dispatch: Dispatch<any>;
}

function ParameterRow({
  element,
  elementIsLocked,
  combinations,
  selectedCombinations,
  filterName,
  headerColor,
  bodyColor,
  dispatch,
}: Props) {
  const attributes = element.attributes;

  const isElementNode = (element as Node).connectors !== undefined;

  return (
    <Body>
      <Entity width={180}>
        <Box color={bodyColor} id="ParametersBox">
          <div className="icon">
            <CloseParameterFilterIconComponent
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
            OnChangeAttributeCombinationChoice(
              element.id,
              filterName,
              combination,
              selected,
              dispatch
            )
          }
          color={headerColor}
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
          onChange={(id, value, unit, nodeId) =>
            OnChangeParameterValue(id, value, unit, nodeId, dispatch)
          }
          onLock={(attribute, isLocked) =>
            OnLockParameter(
              attribute,
              isLocked,
              element.id,
              elementIsLocked,
              isElementNode,
              dispatch
            )
          }
          onClose={() =>
            OnChangeAttributeCombinationChoice(element.id, filterName, combination, true, dispatch)
          }
        />
      ))}
    </Body>
  );
}

export default ParameterRow;
