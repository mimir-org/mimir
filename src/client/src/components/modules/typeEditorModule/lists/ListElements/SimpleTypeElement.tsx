import { CompositeType } from "../../../../../models";
import { Checkbox, Label } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../compLibrary";

interface Props {
  simpleType: CompositeType;
  onChange: Function;
  defaultValue?: string[];
}

export const SimpleTypeElement = ({ simpleType, onChange, defaultValue }: Props) => {
  //   const showAttributes = () => {
  //     return simpleType.attributeTypes.map((a) => {
  //       return (
  //         <p key={a.id}>
  //           <span>
  //             {a.source?.name}
  //             {a.entity} -{a.qualifier?.name},{a.condition?.name}
  //           </span>
  //         </p>
  //       );
  //     });
  //   };
  const isSelected = defaultValue?.includes(simpleType.id);
  return (
    <ListElem isSelected={isSelected}>
      <Checkbox
        id={simpleType.id}
        name={simpleType.name}
        label={Label.compositeTypes}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      {/* <p>{showAttributes()}</p> */}
    </ListElem>
  );
};

export default SimpleTypeElement;
