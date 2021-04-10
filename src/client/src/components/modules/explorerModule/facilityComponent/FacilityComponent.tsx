import "./facility.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectWrapper, FacilityHeader } from "../styled";
import { GetNodes } from "../../../flow/helpers";
import { NODE_TYPE } from "../../../../models/project";

export const FacilityComponent = () => {
  const aspects = GetNodes();

  return (
    <>
      <FacilityHeader>
        {/* <CheckboxComponent id="1" inputLabel="Facility" /> */}
      </FacilityHeader>
      <AspectWrapper>
        {aspects.map((obj: object, i: number) => {
          if (aspects[i].type === NODE_TYPE.ASPECT) {
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
