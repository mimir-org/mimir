import { Icon } from "../../compLibrary/icon";
import { TextResources } from "../../assets/text";
import { FunctionFilter, LocationFilter, ProductFilter } from "../../assets/icons/aspects";
import { AspectBoxesUnderline, AspectBoxesWrapper, AspectFilterWrapper } from "./styled";

interface Props {
  onChange: () => void;
}

const AspectBoxes = ({ onChange }: Props) => {
  const aspects = [TextResources.Aspect_Function, TextResources.Aspect_Product, TextResources.Aspect_Location];
  const aspectIcons = [FunctionFilter, ProductFilter, LocationFilter];

  return (
    <>
      <AspectBoxesWrapper>
        {aspects.map((aspect, i) => {
          return (
            <AspectFilterWrapper key={i}>
              <Icon size={24} src={aspectIcons[i]} alt="" onClick={() => null} />
              <span>{aspect}</span>
            </AspectFilterWrapper>
          );
        })}
      </AspectBoxesWrapper>
      <AspectBoxesUnderline />
    </>
  );
};

export default AspectBoxes;
