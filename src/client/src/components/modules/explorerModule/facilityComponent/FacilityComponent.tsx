import "./facility.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectWrapper, FacilityHeader } from "../styled";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export const FacilityComponent = () => {
  const aspects: any = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  );

  return (
    <>
      <FacilityHeader>
        {/* <CheckboxComponent id="1" inputLabel="Facility" /> */}
      </FacilityHeader>
      <AspectWrapper>
        {aspects.map((obj: object, i: number) => {
          while (i < 3) {
            return (
              <AspectComponent key={i} id={obj["id"]} name={obj["name"]} />
            );
          }
          return null;
        })}
      </AspectWrapper>
    </>
  );
};

export default FacilityComponent;
