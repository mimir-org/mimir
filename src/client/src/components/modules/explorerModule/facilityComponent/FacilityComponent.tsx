import "./facility.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectWrapper, FacilityHeader } from "../styled";
import { GetNodesFromState } from "../../../flow/helpers";

export const FacilityComponent = () => {
  const aspects = GetNodesFromState();

  return (
    <>
      <FacilityHeader>
        {/* <CheckboxComponent id="1" inputLabel="Facility" /> */}
      </FacilityHeader>
      <AspectWrapper>
        {aspects.map((obj: object, i: number) => {
          while (i < 3) {
            return (
              <AspectComponent
                key={i}
                nodeId={obj["id"]}
                name={obj["name"]}
                type={obj["label"]}
              />
            );
          }
          return null;
        })}
      </AspectWrapper>
    </>
  );
};

export default FacilityComponent;
