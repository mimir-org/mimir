import { Input, InputBox, Select } from "../../../../compLibrary";
import { TabColumn } from "../../../../compLibrary/box/inspector";
import { Attribute } from "../../../../models";

interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

interface Props {
  list: ConnectorAttribute[];
  handleChange: any;
}

const SetConnectorColumn = ({ list, handleChange }: Props): any => {
  return list?.map((connector: ConnectorAttribute) => (
    <TabColumn key={connector.id} fontSize="10">
      {connector?.attributes.map((attr: Attribute) => (
        <div key={attr.id}>
          <div>
            {attr.key} {connector.name}
          </div>
          <InputBox>
            <Input
              value={attr.value ?? ""}
              onChange={(e: any) =>
                handleChange(
                  attr.id,
                  e.target.value,
                  attr.unit
                  //   attr.connectorId
                )
              }
              inputType="tech"
            />
            <Select
              value={attr.unit}
              onChange={(e: any) =>
                handleChange(
                  attr.id,
                  attr.value,
                  e.target.value
                  //   attr.connectorId
                )
              }
            >
              <option value={"NotSet"}>NotSet</option>
              {attr.units.map((unit) => (
                <option>{unit}</option>
              ))}
            </Select>
          </InputBox>
        </div>
      ))}
    </TabColumn>
  ));
};

export default SetConnectorColumn;
