import { CloseParameterIcon } from "../../../../assets/icons/common";
import { Color } from "../../../../compLibrary";
import { Attribute, CombinedAttribute, Node } from "../../../../models";
import { lockUnlockAttribute } from "../../../../redux/store/project/actions";
import { OnClearParameter, OnChangeParameterValue } from "./handlers";
import OnChangeFilterCombination from "./handlers/OnChangeFilterCombination";
import { GetParametersColor, DoesCombinationMatchAttribute } from "./helpers";
import Parameter from "./Parameter";
import { Body, Entity, Box } from "./styled";
import { CombinationDropdown } from "./styled/dropdown/entity";

interface Props {
  node: Node;
  possibleCombinations: CombinedAttribute[];
  selectedCombinations: CombinedAttribute[];
  filterName: string;
  dispatch: any;
}

function ParameterRow({
  node,
  possibleCombinations,
  selectedCombinations,
  filterName,
  dispatch,
}: Props) {
  const attributes = node.attributes;

  const onLockParameter = (attribute: Attribute, isLocked: boolean) => {
    if (!node.isLocked)
      dispatch(lockUnlockAttribute(attribute, node.id, isLocked));
  };

  return (
    <Body key={filterName}>
      <Entity width={180}>
        <Box color={GetParametersColor()} id="ParametersBox">
          <div className="icon">
            <img
              src={CloseParameterIcon}
              alt="icon"
              onClick={() => OnClearParameter(node.id, filterName, dispatch)}
            />
          </div>
          <div className="text">{filterName}</div>
        </Box>
        <CombinationDropdown
          items={possibleCombinations}
          selectedItems={selectedCombinations}
          keyProp="combined"
          onChange={(combination, selected) =>
            OnChangeFilterCombination(
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
          onLock={onLockParameter}
          onClose={() =>
            OnChangeFilterCombination(
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
