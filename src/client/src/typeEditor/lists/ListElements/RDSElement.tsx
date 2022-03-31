import { ListType, RadioButtonContainer } from "../../inputs/RadioButtonContainer";
import { RdsListElement } from "../../styled";
import { Rds } from "../../../models";
import { OnPropertyChangeFunction } from "../../types";

interface Props {
  rds: Rds;
  defaultValue: string;
  onChange: OnPropertyChangeFunction;
}

export const RDSElement = ({ rds, defaultValue, onChange }: Props) => (
  <RdsListElement key={rds.id} isSelected={rds.id === defaultValue}>
    <RadioButtonContainer
      id={rds.id}
      label={rds?.id + " - " + rds.name}
      listType={ListType.Rds}
      onChange={(key, data) => onChange(key, data)}
      defaultValue={defaultValue}
    />
  </RdsListElement>
);

export default RDSElement;
