import "./facility.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectWrapper, FacilityHeader } from "../styled";

interface FacilityComponentProps {
  name: string;
  id: string;
  checked?: boolean;
  aspect: object[];
}

export const FacilityComponent = ({
  name,
  id,
  checked,
  aspect,
}: FacilityComponentProps) => {
  return (
    <>
      <CheckboxComponent id={id} inputLabel={name} checked={checked} />
      <AspectWrapper>
        {aspect.map(function (a, index) {
          return (
            <AspectComponent
              key={index}
              id={a["id"]}
              name={a["name"]}
              facet={a["facet"]}
            />
          );
        })}
      </AspectWrapper>
    </>
  );
};

export default FacilityComponent;
