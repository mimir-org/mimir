import { Attribute, Node } from "../../../models";
import { TabRow } from "../../../compLibrary/box/inspector";
import { InputWrapper } from "../styled";
import { useDispatch } from "react-redux";
import { changeAttributeValue } from "../../../redux/store/project/actions";
import { Input, InputBox, Select, AttributeField } from "../../../compLibrary";
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
                <Select
                  value={attr.selectedUnitId ?? ""}
                  onChange={(e: any) =>
                    onNodeChange(attr.id, attr.value, e.target.value)
                  }
                >
                  <option value={"3A28C02532C32420AC3A775BEB2B7E5C"}>
                    NotSet
                  </option>
                  {attr.units?.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </Select>
              </InputWrapper>
            </InputBox>
          </AttributeField>
        );
      })}
    </TabRow>
  );
};
export default ParametersComponent;
