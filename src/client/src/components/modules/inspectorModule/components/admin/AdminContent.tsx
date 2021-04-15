import textResources from "../../../../../textResources";
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
        <>
          {console.log("test i: ", index)}
          <FragmentParagraph>
            {textResources.Inspector_Admin_Id}
          </FragmentParagraph>
          {customInput && index === 1 ? (
            <FragmentInput width="385" height="88" />
          ) : (
            <FragmentInput width={width} height={height} />
          )}
        </>
      ))}
    </FragmentColumn>
  );
};

export default AdminContent;
