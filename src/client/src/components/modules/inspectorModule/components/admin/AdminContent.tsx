import textResources from "../../../../../textResources";
import { createId } from "../../../../flow/utils";
import { FragmentColumn, FragmentInput, FragmentParagraph } from "../../styled";

interface Props {
  index: number;
  width?: string | undefined;
  height?: string | undefined;
  customInput?: boolean;
  customColumn?: boolean | false;
}

const AdminContent = ({
  index,
  width,
  height,
  customInput,
  customColumn,
}: Props) => {
  const position = customColumn;

  return (
    <FragmentColumn position={position}>
      {[...Array(index)].map((index: number) => (
        <div key={createId()}>
          <FragmentParagraph>
            {textResources.Inspector_Admin_Id}
          </FragmentParagraph>
          {customInput && index === 1 ? (
            <FragmentInput width="385" height="88" />
          ) : (
            <FragmentInput width={width} height={height} />
          )}
        </div>
      ))}
    </FragmentColumn>
  );
};

export default AdminContent;
