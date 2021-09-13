import { Attribute, Node } from "../../../models";
import { TabRow } from "../../../compLibrary/box/inspector";
import { InputWrapper } from "../styled";
import { useDispatch } from "react-redux";
import { changeAttributeValue } from "../../../redux/store/project/actions";
import { Input, InputBox, AttributeField } from "../../../compLibrary";
import { Dropdown } from "../../../compLibrary/dropdown/mimir";
import {
  IsTransportTerminal,
  CreateId,
} from "../../../components/flow/helpers/common";

interface Props {
  node: Node;
}

interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

const ParametersComponent = ({ node }: Props) => {
  const dispatch = useDispatch();

  const onNodeChange = (id: string, value: string, unit: any) => {
    dispatch(changeAttributeValue(id, value, unit, node.id));
  };

  const tempAttributes: ConnectorAttribute[] = [];
  let nodeAttributes: Attribute[] = [];

  if (node) {
    node.connectors?.forEach((conn) => {
      if (IsTransportTerminal(conn)) {
        const data = {
          id: conn.id,
          name: conn.name + " " + conn.type,
          attributes: conn.attributes,
        } as ConnectorAttribute;
        tempAttributes.push(data);
      }
    });
    nodeAttributes = node.attributes;
  }
  return (
    <TabRow>
      {nodeAttributes?.map((attr) => {
        return (
          <AttributeField key={CreateId()}>
            <div>{attr.key}</div>
            <InputBox>
              <InputWrapper width={70} rightMargin={"4px"}>
                <Input
                  value={attr.value ?? ""}
                  onChange={(e: any) =>
                    onNodeChange(attr.id, e.target.value, attr.unit)
                  }
                  inputType="tech"
                />
              </InputWrapper>
              <InputWrapper width={30}>
                <Dropdown
                  label=""
                  items={attr.units}
                  keyProp={null}
                  valueProp={null}
                  onChange={(e: any) =>
                    onNodeChange(attr.id, attr.value, e.target.value)
                  }
                ></Dropdown>
              </InputWrapper>
            </InputBox>
          </AttributeField>
        );
      })}
    </TabRow>
  );
};
export default ParametersComponent;
