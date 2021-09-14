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
} from "./handlers";

interface Props {
  node: Node;
}

const ParametersComponent = ({ node }: Props) => {
  const dispatch = useDispatch();
  const attributes = node.attributes;

  const selectedParameters = useSelector<RootState>(
    (state) => state.parametersReducer.attributes
  ) as Attribute[];

  const hasParameters = selectedParameters?.length > 0;

  return (
    <>
      <Header>
        <Menu>
          <Dropdown
            onChange={(value: Attribute) =>
              OnChangeParameter(value, dispatch, selectedParameters)
            }
            keyProp="id"
            valueProp="key"
            items={attributes}
          />
          <div className="link" onClick={() => OnClearParameters(dispatch)}>
            {TextResources.Inspector_Params_Clear_All}
          </div>
          <div className="link">{TextResources.Inspector_Params_Default}</div>
        </Menu>
      </Header>

      <Body>
        {hasParameters &&
          selectedParameters.map((param) => {
            return (
              <Entity key={param.key}>
                <Box color={GetParametersColor()} id="ParametersBox">
                  <div className="icon">
                    <img
                      src={CloseParameterIcon}
                      alt="icon"
                      onClick={() => OnClearParameter(dispatch, param)}
                    />
                  </div>
                  <div className="text">{param.key}</div>
                </Box>
                <EntityDropdown
                  items={param.units}
                  keyProp="id"
                  onChange={() => null}
                  color={GetParametersColor()}
                />
              </Entity>
            );
          })}
      </Body>
    </>
  );
};
export default ParametersComponent;
