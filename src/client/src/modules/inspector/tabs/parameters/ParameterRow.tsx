import { Dispatch } from "redux";
import { CloseParameterIcon } from "../../../../assets/icons/common";
import { Color } from "../../../../compLibrary";
import { CombinedAttribute, Node } from "../../../../models";
import { GetParametersColor, DoesCombinationMatchAttribute } from "./helpers";
import Parameter from "./Parameter";
import { Body, Entity, Box } from "./styled";
import { CombinationDropdown } from "./styled/dropdown/combination";
import {
  OnChangeParameterValue,
  OnChangeFilterChoice,
  OnLockParameter,
  OnChangeAttributeCombinationChoice,
} from "./handlers";

interface Props {
  node: Node;
  combinations: CombinedAttribute[];
  selectedCombinations: CombinedAttribute[];
  filterName: string;
  dispatch: Dispatch<any>;
}

function ParameterRow({
  node,
  combinations,
  selectedCombinations,
  filterName,
  dispatch,
}: Props) {
  const attributes = node.attributes;

  return (
    <Body>
      <Entity width={180}>
        <Box color={GetParametersColor()} id="ParametersBox">
          <div className="icon">
            <img
              src={CloseParameterIcon}
              alt="icon"
              onClick={() =>
                OnChangeFilterChoice(node.id, filterName, true, dispatch)
              }
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
              node.id,
              filterName,
              combination,
              selected,
              dispatch
            )
          }
          color={Color.ParamsPurple}
        />
      </Entity>
      {selectedCombinations.map((combination) => (
        <Parameter
          key={combination.combined}
          attribute={attributes.find(
            (attr) =>
              attr.key === filterName &&
              DoesCombinationMatchAttribute(combination, attr)
          )}
          combination={combination}
          isNodeLocked={node.isLocked}
          onChange={(id, value, unit, nodeId) =>
            OnChangeParameterValue(id, value, unit, nodeId, dispatch)
          }
          onLock={(attribute, isLocked) =>
            OnLockParameter(node, attribute, isLocked, dispatch)
          }
          onClose={() =>
            OnChangeAttributeCombinationChoice(
              node.id,
              filterName,
              combination,
              true,
              dispatch
            )
          }
        />
      ))}
    </Body>
  );
}

export default ParameterRow;
