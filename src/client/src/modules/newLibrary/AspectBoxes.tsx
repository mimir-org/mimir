/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "../../compLibrary/icon";
import { Aspect } from "../../models";
import { GetFilterIcon } from "./helpers";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { AspectBoxesWrapper, AspectFilterButtonContainer } from "./styled";
import { TextResources } from "../../assets/text";

interface Props {
  aspectFilters: Aspect[];
  setAspectFilters: (value: Aspect[]) => void;
}

/**
 * Component for filtering types by aspect in Library Module
 * @param interface
 * @returns filters of each aspect
 */

const AspectBoxes = ({ aspectFilters, setAspectFilters }: Props) => {
  const stringIsNumber = (value: any) => isNaN(Number(value)) === false;

  const isAspectSelected = (aspect: Aspect) => aspectFilters.includes(aspect);
  const toggleAspectFilter = (aspect: Aspect) => {
    const filters = [...aspectFilters];
    const index = filters.indexOf(aspect);

    index < 0 ? filters.push(aspect) : filters.splice(index, 1);
    setAspectFilters(filters);
  };

  return (
    <AspectBoxesWrapper>
      {Object.keys(Aspect)
        .filter(stringIsNumber)
        .filter((aspect) => Number(aspect) !== Aspect.None && Number(aspect) !== Aspect.NotSet)
        .map((aspect, i) => {
          const aspectSelected = isAspectSelected(Number(aspect));
          const aspectName = Aspect[aspect].toLowerCase();

          return (
            <Tooltip
              key={i}
              content={
                aspectSelected
                  ? `${TextResources.Library_Aspect_Toggle} ${aspectName} ${TextResources.Library_Aspect_Filter_Off}`
                  : `${TextResources.Library_Aspect_Toggle} ${aspectName} ${TextResources.Library_Aspect_Filter_On}`
              }
              offset={[0, 10]}
            >
              <AspectFilterButtonContainer onClick={() => toggleAspectFilter(Number(aspect))}>
                <Icon size={24} src={GetFilterIcon(Number(aspect), aspectSelected)} alt="aspect-icon" />
                <span>{Aspect[aspect]}</span>
              </AspectFilterButtonContainer>
            </Tooltip>
          );
        })}
    </AspectBoxesWrapper>
  );
};

export default AspectBoxes;
