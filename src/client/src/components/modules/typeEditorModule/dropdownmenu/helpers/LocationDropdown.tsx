import { useDispatch } from "react-redux";
import { LocationTypeCategory, LocationSubType } from "../../styled";
import { changeLocationType } from "../../../../../redux/store/typeEditor/actions";

interface Props {
  listItems: any[];
  setSelectedValue: any;
  setIsListOpen: any;
  isListOpen: boolean;
}

const LocationDropdown = ({
  listItems,
  setSelectedValue,
  setIsListOpen,
  isListOpen,
}: Props) => {
  const dispatch = useDispatch();

  const updateLocationType = (locationTypeId, locationName) => {
    setSelectedValue(locationName);
    dispatch(changeLocationType(locationTypeId));
    setIsListOpen(!isListOpen);
  };

  return (
    <>
      {listItems?.map((item) => {
        return (
          <div key={item[1].id}>
            {item.map((type) => {
              return (
                <div key={type}>
                  {type.name && (
                    <div className="listitem" key={type.id}>
                      <LocationTypeCategory>
                        <p>{type.name} hei</p>
                      </LocationTypeCategory>
                      {type.locationSubTypes?.map((subType) => {
                        return (
                          <LocationSubType
                            key={subType.id}
                            onClick={() =>
                              updateLocationType(subType.id, subType.name)
                            }
                          >
                            <p>{subType.name}</p>
                          </LocationSubType>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      ;
    </>
  );
};

export default LocationDropdown;
