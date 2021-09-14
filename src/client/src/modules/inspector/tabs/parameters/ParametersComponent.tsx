import { CloseParameterIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "../../../../compLibrary/dropdown/mimir";
import { Node } from "../../../../models";
import { GetParametersColor } from "./helpers";
import { EntityDropdown } from "./styled/dropdown";
import { Menu, Body, Box, Header, Entity } from "./styled";

interface Props {
  node: Node;
}
const ParametersComponent = ({ node }: Props) => {
  const attributes = node.attributes;

  return (
    <>
      <Header>
        <Menu>
          <Dropdown
            label=""
            onChange={() => null}
            keyProp="id"
            valueProp="key"
            items={attributes}
          />
          <div className="link">{TextResources.Inspector_Params_Clear_All}</div>
          <div className="link">{TextResources.Inspector_Params_Default}</div>
        </Menu>
      </Header>

      <Body>
        <Entity id="ParametersEntity">
          <Box color={GetParametersColor()} id="ParametersBox">
            <div className="icon">
              <img src={CloseParameterIcon} alt="icon" />
            </div>
            <div className="text">{attributes[0].key}</div>
          </Box>
          <EntityDropdown
            label=""
            items={attributes[0].units}
            keyProp="id"
            valueProp="key"
            onChange={() => null}
            color={GetParametersColor()}
          />
        </Entity>
      </Body>
    </>
  );
};
export default ParametersComponent;
