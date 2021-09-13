import { Input, InputBox } from "../../../compLibrary";
import { TabColumn } from "../../../compLibrary/box/inspector";
import { Dropdown } from "../../../compLibrary/dropdown";
import { Attribute } from "../../../models";

interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

interface Props {
  list: ConnectorAttribute[];
  handleChange: any;
}

const ConnectorAttributesList = ({ list, handleChange }: Props): any => {
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
            <Dropdown
              label=""
              items={attr.units}
              keyProp={null}
              valueProp={null}
              onChange={(e: any) =>
                handleChange(
                  attr.id,
                  attr.value,
                  e.target.value
                  //   attr.connectorId
                )
              }
            ></Dropdown>
          </InputBox>
        </div>
      ))}
    </TabColumn>
  ));
};

export default ConnectorAttributesList;
