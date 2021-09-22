import { CompositeType } from "../../../../../models";
import { Checkbox, Label } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  compositeType: CompositeType;
  onChange: Function;
  defaultValue?: string[];
}

export const CompositeTypeElement = ({
  compositeType,
  onChange,
  defaultValue,
}: Props) => {
  return (
    <ListElem>
      <Checkbox
        id={compositeType.id}
        label={Label.CompositeTypes}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <p>{compositeType.name}</p>
      {compositeType.attributes.forEach((a) => {
        return (
          <p>
            <span>{a.source.name} </span>
            <span>{a.entity} - </span>
            <span>{a.qualifier.name}, </span>
            <span>{a.condition.name}</span>
          </p>
        );
      })}
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default CompositeTypeElement;
