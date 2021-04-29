import { Attribute } from "../../../models/project";
import { CreateId } from "../../flow/helpers";
import { TabColumn, TabInput } from "./styled";

interface Props {
  attr: Attribute[];
}

const TabContent = ({ attr }: Props) => {
  const isValid = attr[0] !== undefined;
  const columns = 4;
  //   const elements = attr.length;
  //   const rows = elements/columns;

  return (
    <>
      {[...Array(columns)].map(() => (
        <TabColumn key={CreateId()}>
          {isValid &&
            attr.map((j, i) => (
              <div key={CreateId()}>
                <div>{attr[i].key}</div>
                <TabInput
                  value={attr[i].value}
                  onChange={() => null}
                  inputType={attr[i].inputType}
                />
              </div>
            ))}
        </TabColumn>
      ))}
    </>
  );
};

export default TabContent;
