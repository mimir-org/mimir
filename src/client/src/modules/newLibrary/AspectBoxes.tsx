/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "../../compLibrary/icon";
import { Aspect } from "../../models";
import { GetFilterIcon } from "./helpers";
import { AspectBoxesUnderline, AspectBoxesWrapper, AspectFilterWrapper } from "./styled";
import { SortTypesByAspect } from "./tabs/Collections/helpers";

interface Props {
  functionSort: boolean;
  productSort: boolean;
  locationSort: boolean;
  setFunctionSort: (sort: boolean) => void;
  setProductSort: (sort: boolean) => void;
  setLocationSort: (sort: boolean) => void;
}

const AspectBoxes = ({ functionSort, productSort, locationSort, setFunctionSort, setProductSort, setLocationSort }: Props) => {
  const stringIsNumber = (value: any) => isNaN(Number(value)) === false;

  const updateAspectFilters = (aspect: Aspect) => {
    SortTypesByAspect(aspect, functionSort, productSort, locationSort, setFunctionSort, setProductSort, setLocationSort);
  };
  return (
    <>
      <AspectBoxesWrapper>
        {Object.keys(Aspect)
          .filter(stringIsNumber)
          .filter((aspect) => Number(aspect) !== Aspect.None && Number(aspect) !== Aspect.NotSet)
          .map((aspect, i) => {
            return (
              <AspectFilterWrapper key={i} onClick={() => updateAspectFilters(Number(aspect))}>
                <Icon size={24} src={GetFilterIcon(Number(aspect), functionSort, productSort, locationSort)} alt="aspect-icon" />
                <span>{Aspect[aspect]}</span>
              </AspectFilterWrapper>
            );
          })}
      </AspectBoxesWrapper>
      <AspectBoxesUnderline />
    </>
  );
};

export default AspectBoxes;
