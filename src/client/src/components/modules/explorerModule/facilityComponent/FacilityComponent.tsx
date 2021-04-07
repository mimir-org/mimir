import "./facility.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectWrapper, FacilityHeader } from "../styled";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export const FacilityComponent = () => {
  const aspects = useSelector<RootState>(
    (state) => state.projectState.project?.nodes
  );

  return (
    <>
      <FacilityHeader>
        <CheckboxComponent id="1" inputLabel="Facility" />
      </FacilityHeader>
      <AspectWrapper>
        <AspectComponent key={null} id={null} name={aspects[0].name} />
        <AspectComponent key={null} id={null} name={aspects[1].name} />
        <AspectComponent key={null} id={null} name={aspects[2].name} />
        {/* {aspect.map(function (a, index) {
          return (
            <AspectComponent
              key={index}
              id={a["id"]}
              name={a["name"]}
              facet={a["facet"]}
            />
          );
        })} */}
      </AspectWrapper>
    </>
  );
};

export default FacilityComponent;
