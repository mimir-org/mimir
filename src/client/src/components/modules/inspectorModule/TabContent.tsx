import { Attribute } from "../../../models/project";
import { createId } from "../../flow/utils";
import { TabColumn, TabInput, TabParagraph } from "./styled";

interface Props {
  attr: Attribute[];
  columns: number;
}

const TabContent = ({ attr, columns }: Props) => {
  const isValid = attr[0] !== undefined;

  return (
    <>
      {[...Array(columns)].map(() => (
        <TabColumn key={createId()}>
          {isValid &&
            attr.map((j, i) => (
              <div key={createId()}>
                <TabParagraph>{attr[i].key}</TabParagraph>
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
