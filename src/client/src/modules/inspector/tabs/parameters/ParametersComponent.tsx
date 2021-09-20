import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CloseParameterIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "./styled/dropdown/parameter";
import { Node } from "../../../../models";
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
    ) as string[]) ?? [];

  const hasAttributes = selectedAttributes.length > 0;

  const filteredAttributes = attributes.filter((x) =>
    selectedAttributes.includes(x.id)
  );

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
            onChange={(parameterId: string, selected: boolean) =>
              OnChangeParameter(node.id, parameterId, selected, dispatch)
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
        filteredAttributes.map((attribute) => {
          return (
            <Body key={attribute.key}>
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
