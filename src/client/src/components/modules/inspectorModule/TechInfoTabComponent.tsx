import { Attribute, Node } from "../../../models";
import { TabRow } from "../../../compLibrary/box/inspector";
import { IsTransportTerminal, CreateId } from "../../flow/helpers/common";
import { Input, InputBox, Select, AttributeField } from "../../../compLibrary";
import { InputWrapper } from "./styled";
import { useDispatch } from "react-redux";
import {
    changeAttributeValue,
    changeConnectorAttributeValue,
  } from "../../../redux/store/project/actions";

interface ConnectorAttribute {
    id: string;
    name: string;
    attributes: Attribute[];
  }

const TechInfoTabComponent = ({ node }) => {
    const dispatch = useDispatch();
    const handleOnNodeChange = (id: string, value: string, unit: any) => {
        dispatch(changeAttributeValue(id, value, unit, node.id));
    };

    const tempAttributes: ConnectorAttribute[] = [];
    let nodeAttributes: Attribute[] = [];

    if (node) {
        node.connectors?.forEach((connector) => {
          if (IsTransportTerminal(connector)) {
            const data = {
              id: connector.id,
              name: connector.name + " " + connector.type,
              attributes: connector.attributes,
            } as ConnectorAttribute;
            tempAttributes.push(data);
          }
        });
        nodeAttributes = node.attributes;
      }
    return (
        <TabRow>
          {nodeAttributes?.map((attr) => {
            let inputFieldWidth = (attr.value?.length ?? 1) * 3 + 10;
            //inputFieldWidth = (inputFieldWidth <= 10) ? 10 : inputFieldWidth;
            return (
              <AttributeField key={CreateId()}>
                <div>{attr.key}</div>
                <InputBox>
                  <InputWrapper
                    width={inputFieldWidth + "%"}
                    rightMargin={"4px"}
                  >
                    <Input
                      value={attr.value ?? ""}
                      onChange={
                        (e: any) =>
                          handleOnNodeChange(attr.id, e.target.value, attr.unit)
                      }
                      inputType="tech"
                    />
                  </InputWrapper>
                  <InputWrapper width={100 - inputFieldWidth + "%"}>
                    <Select
                      value={attr.unit}
                      onChange={(e: any) =>
                        handleOnNodeChange(attr.id, attr.value, e.target.value)
                      }
                    >
                      <option value={"NotSet"}>NotSet</option>
                      {attr.units?.map((unit) => (
                        <option value={unit + "langt navn"}>{unit}</option>
                      ))}
                    </Select>
                  </InputWrapper>
                </InputBox>
              </AttributeField>
            );
          })}
        </TabRow>
    );
}
export default TechInfoTabComponent;