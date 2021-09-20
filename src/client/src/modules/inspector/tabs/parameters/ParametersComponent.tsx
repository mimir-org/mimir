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

interface Props {
  node: Node;
}

const ParametersComponent = ({ node }: Props) => {
  const dispatch = useDispatch();
  const attributes = node.attributes;

  const selectedAttributes =
    (useSelector<RootState>(
      (state) => state.parametersReducer.attributes[node.id]
    ) as Attribute[]) ?? [];

  const hasAttributes = selectedAttributes.length > 0;

  const selectedParameters = [
    {
      id: "aaaa",
      qualifier: "Operating",
      source: "Calculcated",
      condition: "Maximum",
    },
  ];

  const onLockParameter = () => {};

  const onCloseParameter = () => {};

  return (
    <>
      <Header>
        <Menu>
          <Dropdown
            onChange={(value: Attribute, selected: boolean) =>
              OnChangeParameter(node.id, value, selected, dispatch)
            }
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
        selectedAttributes.map((attribute) => {
          return (
            <Body key={attribute.key}>
              <Entity width={180}>
                <Box color={GetParametersColor()} id="ParametersBox">
                  <div className="icon">
                    <img
                      src={CloseParameterIcon}
                      alt="icon"
                      onClick={() =>
                        OnClearParameter(node.id, attribute, dispatch)
                      }
                    />
                  </div>
                  <div className="text">{attribute.key}</div>
                </Box>
                <EntityDropdown
                  items={attribute.units}
                  keyProp="id"
                  onChange={() => null}
                  color={GetParametersColor()}
                />
              </Entity>
              {selectedParameters.map((param) => (
                <Parameter
                  key={param.id}
                  attribute={attribute}
                  onChange={(id, value, unit, nodeId) =>
                    OnChangeParameterValue(id, value, unit, nodeId, dispatch)
                  }
                  onLock={onLockParameter}
                  onClose={onCloseParameter}
                />
              ))}
            </Body>
          );
        })}
    </>
  );
};
export default ParametersComponent;
