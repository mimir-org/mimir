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
        {aspects.map(function (a, index) {
          return <AspectComponent key={index} id={a["id"]} name={a["name"]} />;
        })}
      </AspectWrapper>
    </>
  );
};

export default FacilityComponent;
