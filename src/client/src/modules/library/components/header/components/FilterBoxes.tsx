import { Icon } from "../../../../../compLibrary/icon";
import { GetFilterIcon } from "./helpers/GetFilterIcon";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { Aspect } from "../../../../../models";
import { FilterBoxesWrapper, FilterBoxButton } from "./FilterBoxes.styled";
import { TextResources } from "../../../../../assets/text/TextResources";

interface Props {
  // collectionState: CollectionsActions;
  aspectFilters: Aspect[];
  setAspectFilters: (value: Aspect[]) => void;
  // setCollectionState: (action: CollectionsActions) => void;
}
/**
 * Component for filtering types by aspect in Library Module
 * @param interface
 * @returns filters of each aspect
 */

export const FilterBoxes = ({ aspectFilters, setAspectFilters }: Props) => {
  const stringIsNumber = (value: string) => isNaN(Number(value)) === false;
  // const onCollectionsClick = () => {
  //   if (collectionState === CollectionsActions.ManageType) setCollectionState(CollectionsActions.ReadOnly);
  //   else setCollectionState(CollectionsActions.ManageType);
  // };

  const isAspectSelected = (aspect: Aspect) => aspectFilters.includes(aspect);
  const toggleAspectFilter = (aspect: Aspect) => {
    const filters = [...aspectFilters];
    const index = filters.indexOf(aspect);

    index < 0 ? filters.push(aspect) : filters.splice(index, 1);
    setAspectFilters(filters);
  };

  // const getCollectionIcon = () => {
  //   if (collectionState === CollectionsActions.ManageType) return ColoredCollections;
  //   else return Collections;
  // };

  return (
    <FilterBoxesWrapper>
      {/* <FilterWrapper onClick={onCollectionsClick}>
        <Icon size={24} src={getCollectionIcon()} alt="collection" />
      </FilterWrapper> */}
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
              <FilterBoxButton onClick={() => toggleAspectFilter(Number(aspect))}>
                <Icon size={24} src={GetFilterIcon(Number(aspect), aspectSelected)} alt="" />
              </FilterBoxButton>
            </Tooltip>
          );
        })}
    </FilterBoxesWrapper>
  );
};
