import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CloseParameterIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "./styled/dropdown/parameter";
import {
  Attribute,
  CombinedAttribute,
  CombinedAttributeFilter,
  Node,
} from "../../../../models";
import { GetParametersColor } from "./helpers";
import { CombinationDropdown } from "./styled/dropdown/entity";
import { Menu, Body, Box, Header, Entity } from "./styled";
import {
  OnChangeParameter,
  OnClearParameters,
  OnClearParameter,
  OnChangeParameterValue,
} from "./handlers";
import Parameter from "./Parameter";
import { lockUnlockAttribute } from "../../../../redux/store/project/actions";
import { useState } from "react";
import { Color } from "../../../../compLibrary";

interface Props {
  node: Node;
}

const ParametersComponent = ({ node }: Props) => {
  const dispatch = useDispatch();
  const attributes = node.attributes;

  const attributeFilters =
    (
      useSelector<RootState>(
        (state) => state.commonState.filters
      ) as CombinedAttributeFilter[]
    ).filter((x) => node.attributes.find((att) => att.key === x.name)) ?? [];

  const selectedAttributes =
    (useSelector<RootState>(
      (state) => state.parametersReducer.attributes[node.id]
    ) as string[]) ?? [];

  const [selectedCombinations, setSelectedCombinations] = useState(
    new Map<string, CombinedAttribute[]>()
  );

  const hasAttributes = selectedAttributes.length > 0;

  const filteredAttributes = attributes.filter((x) =>
    selectedAttributes.includes(x.id)
  );

  const onChangeParameterChoice = (
    combination: CombinedAttribute,
    attributeId: string,
    selected: boolean
  ) => {
    if (!selectedCombinations.has(attributeId)) {
      selectedCombinations.set(attributeId, []);
    }

    const combinations = selectedCombinations.get(attributeId);

    selected
      ? selectedCombinations.set(
          attributeId,
          combinations.filter((x) => x.combined !== combination.combined)
        )
      : combinations.push(combination);

    setSelectedCombinations(new Map(selectedCombinations));
  };

  const onLockParameter = (attribute: Attribute, isLocked: boolean) => {
    if (!node.isLocked)
      dispatch(lockUnlockAttribute(attribute, node.id, isLocked));
  };

  const onCloseParameter = (
    combination: CombinedAttribute,
    attributeId: string
  ) => onChangeParameterChoice(combination, attributeId, true);

  return (
    <>
      <Header>
        <Menu>
          <Dropdown
            onChange={(parameterId: string, selected: boolean) => {
              OnChangeParameter(node.id, parameterId, selected, dispatch);
            }}
            keyProp="id"
            items={attributes}
            selectedItems={selectedAttributes}
          />
          <div
            className="link"
            onClick={() => OnClearParameters(node.id, dispatch)}
          >
            {TextResources.Inspector_Params_Clear_All}
          </div>
          <div className="link">{TextResources.Inspector_Params_Default}</div>
        </Menu>
      </Header>

      {hasAttributes &&
        filteredAttributes.map((attribute) => {
          const combinations = selectedCombinations.get(attribute.id) ?? [];

          return (
            <Body key={attribute.id}>
              <Entity width={180}>
                <Box color={GetParametersColor()} id="ParametersBox">
                  <div className="icon">
                    <img
                      src={CloseParameterIcon}
                      alt="icon"
                      onClick={() =>
                        OnClearParameter(node.id, attribute.id, dispatch)
                      }
                    />
                  </div>
                  <div className="text">{attribute.key}</div>
                </Box>
                <CombinationDropdown
                  items={
                    attributeFilters.find(
                      (filter) => filter.name === attribute.key
                    )?.combinedAttributes
                  }
                  selectedItems={combinations}
                  keyProp="combined"
                  onChange={(combination, selected) =>
                    onChangeParameterChoice(combination, attribute.id, selected)
                  }
                  color={Color.ParamsPurple}
                />
              </Entity>
              {combinations.map((combination) => (
                <Parameter
                  key={combination.combined}
                  attribute={attribute}
                  combination={combination}
                  isNodeLocked={node.isLocked}
                  onChange={(id, value, unit, nodeId) =>
                    OnChangeParameterValue(id, value, unit, nodeId, dispatch)
                  }
                  onLock={onLockParameter}
                  onClose={(id) => onCloseParameter(combination, id)}
                />
              ))}
            </Body>
          );
        })}
    </>
  );
};
export default ParametersComponent;
