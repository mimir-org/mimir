import { ListLabel } from "../../../../compLibrary";
import { TextResources } from "../../../../assets/textResources";

interface Props {
  label: string;
  chooseVisible: boolean;
}

export const ListHeader = ({ label, chooseVisible }: Props) => {
  return (
    <>
      <ListLabel>
        {chooseVisible ? TextResources.TypeEditor_Properties_Choose : null}{" "}
        {label}
      </ListLabel>
    </>
  );
};

export default ListHeader;
