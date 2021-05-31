import { Input, InputBox, Select } from "../../../../componentLibrary";
import { Attribute } from "../../../../models/project";
import { CreateId } from "../../../flow/helpers";
import { TabColumn } from "../../../../componentLibrary/box/inspector";

interface Props {
  list: Attribute[];
  handleChange: any;
}

const SetNodeColumn = ({ list, handleChange }: Props) => {
  return (
    <TabColumn id={CreateId()}>
      {list?.map((attr) => (
        <div key={attr.id}>
          <div>{attr.key}</div>
          <InputBox>
            <Input
              value={attr.value ?? ""}
              onChange={(e: any) =>
                handleChange(attr.id, e.target.value, attr.unit)
              }
              inputType="tech"
            />
            <Select
              value={attr.unit}
              onChange={(e: any) =>
                handleChange(attr.id, attr.value, e.target.value)
              }
            >
              <option value={"NotSet"}>NotSet</option>
              {attr.units.map((unit) => (
                <option key={unit} value={unit} className="select">
                  {unit}
                </option>
              ))}
            </Select>
          </InputBox>
        </div>
      ))}
    </TabColumn>
  );
};

export default SetNodeColumn;
