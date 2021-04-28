import { Attribute } from "../../../models/project";
import { createId } from "../../flow/utils";
import { TabColumn, TabInput, TabParagraph } from "./styled";

interface Props {
  attributes: Attribute[];
  columns: number;
}

const TabContent = ({ attributes, columns }: Props) => {
  const isValid = attributes[0] !== undefined;

  return (
    <>
      {[...Array(columns)].map(() => (
        <TabColumn key={createId()}>
          {isValid &&
            attributes.map((j, i) => (
              <div key={createId()}>
                <TabParagraph>{attributes[i].key}</TabParagraph>
                <TabInput
                  value={attributes[i].value}
                  onChange={() => null}
                  inputType={attributes[i].inputType}
                />
              </div>
            ))}
        </TabColumn>
      ))}
    </>
  );
};

export default TabContent;
