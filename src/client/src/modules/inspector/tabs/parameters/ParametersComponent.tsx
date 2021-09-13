import { CloseParameterIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
import { Dropdown } from "../../../../compLibrary/dropdown/mimir";
import { Node } from "../../../../models";
import { GetParametersColor } from "./helpers";
import {
  EntityWrapper,
  ParametersBody,
  ParametersBox,
  ParametersHeader,
  ParametersUnit,
} from "./styled";

interface Props {
  node: Node;
}
const ParametersComponent = ({ node }: Props) => {
  const attributes = node.attributes;

  return (
    <>
      <ParametersHeader>
        <EntityWrapper>
          <Dropdown
            label=""
            onChange={() => null}
            keyProp="id"
            valueProp="key"
            items={attributes}
          />
          <div className="link">{TextResources.Inspector_Params_Clear_All}</div>
          <div className="link">{TextResources.Inspector_Params_Default}</div>
        </EntityWrapper>
      </ParametersHeader>

      <ParametersBody>
        <ParametersUnit>
          <ParametersBox color={GetParametersColor()}>
            <div className="icon">
              <img src={CloseParameterIcon} alt="icon" />
            </div>
            <div className="text">{attributes[0].key}</div>
          </ParametersBox>
        </ParametersUnit>
      </ParametersBody>
    </>
  );
};
export default ParametersComponent;
