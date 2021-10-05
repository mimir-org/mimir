import { Input, InputBox } from "../../../compLibrary";
import { Attribute } from "../../../models";
import { CreateId } from "../../../components/flow/helpers";
import { TabColumn } from "../styled";
import { Dropdown } from "../../../compLibrary/dropdown/mimir";

interface Props {
  list: Attribute[];
  handleChange: any;
}

const SetNodeColumn = ({ list, handleChange }: Props) => (
  <TabColumn id={CreateId()}>
    {list?.map((attr) => (
      <div key={attr.id}>
        <div>{attr.key}</div>
        <InputBox>
          <Input
            value={attr.value ?? ""}
            onChange={(e: any) => handleChange(attr.id, e.target.value, attr.unit)}
            inputType="tech"
          />
          <Dropdown
            label=""
            items={attr.units}
            keyProp={null}
            valueProp={null}
            onChange={(e: any) => handleChange(attr.id, attr.value, e.target.value)}
          ></Dropdown>
        </InputBox>
      </div>
    ))}
  </TabColumn>
);

export default SetNodeColumn;
