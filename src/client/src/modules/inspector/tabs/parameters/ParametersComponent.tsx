import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CloseParameterIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "./styled/dropdown/parameter";
import { Attribute, Node } from "../../../../models";
import { GetParametersColor } from "./helpers";
import { EntityDropdown } from "./styled/dropdown/entity";
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

interface Props {
  node: Node;
}

const ParametersComponent = ({ node }: Props) => {
  const dispatch = useDispatch();
  const attributes = node.attributes;

  const [selectedParameters, setSelectedParameters] = useState(
    new Map<string, string[]>()
  );

  const selectedAttributes =
    (useSelector<RootState>(
      (state) => state.parametersReducer.attributes[node.id]
    ) as string[]) ?? [];

  const hasAttributes = selectedAttributes.length > 0;

  const filteredAttributes = attributes.filter((x) =>
    selectedAttributes.includes(x.id)
  );

  const attributeCombinations = [
    {
      id: "aaaa",
      key: "bbbb",
      name: "Operating/Calculated/Maximum",
      qualifier: "Operating",
      source: "Calculcated",
      condition: "Maximum",
    },
  ];

  const onChangeParameterChoice = (
    id: string,
    attributeId: string,
    selected: boolean
  ) => {
    if (!selectedParameters.has(attributeId)) {
      selectedParameters.set(attributeId, []);
    }

    const parameters = selectedParameters.get(attributeId);

    selected
      ? selectedParameters.set(
          attributeId,
          parameters.filter((x) => x !== id)
        )
      : parameters.push(id);

    setSelectedParameters(new Map(selectedParameters));
  };

  const onLockParameter = (attribute: Attribute, isLocked: boolean) => {
    if (!node.isLocked)
      dispatch(lockUnlockAttribute(attribute, node.id, isLocked));
  };

  const onCloseParameter = (id: string, attributeId: string) =>
    onChangeParameterChoice(id, attributeId, true);

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
          const parameters = selectedParameters.get(attribute.id) ?? [];

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
                <Dropdown
                  items={attributeCombinations}
                  selectedItems={parameters}
                  keyProp="id"
                  onChange={(id, selected) =>
                    onChangeParameterChoice(id, attribute.id, selected)
                  }
                />
              </Entity>
              {parameters.map((param) => (
                <Parameter
                  key={param}
                  attribute={attribute}
                  isNodeLocked={node.isLocked}
                  onChange={(id, value, unit, nodeId) =>
                    OnChangeParameterValue(id, value, unit, nodeId, dispatch)
                  }
                  onLock={onLockParameter}
                  onClose={(id) => onCloseParameter(param, id)}
                />
              ))}
            </Body>
          );
        })}
    </>
  );
};
export default ParametersComponent;
