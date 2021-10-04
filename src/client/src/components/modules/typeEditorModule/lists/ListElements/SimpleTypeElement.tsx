import { CompositeType } from "../../../../../models";
import { Checkbox, Label } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  simpleType: CompositeType;
  onChange: Function;
  defaultValue?: string[];
}

export const SimpleTypeElement = ({
  simpleType,
  onChange,
  defaultValue,
}: Props) => {
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
  return (
    <ListElem>
      <Checkbox
        id={simpleType.id}
        label={Label.compositeTypes}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <p>{simpleType.name}</p>
      {/* <p>{showAttributes()}</p> */}
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default SimpleTypeElement;
