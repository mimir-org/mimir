import { ChangeEvent } from "react";
import { TextResources } from "../../../../assets/text";
import { Input } from "../../../../compLibrary";
import { InputWrapper } from "../terminals/styled";

interface Props {
  searchString: string;
  onChange: (value: string) => void;
}

const SimpleTypesSearchBar = ({ searchString, onChange }: Props) => {
  return (
    <InputWrapper>
      <Input
        fontSize={14}
        className={searchString.length > 0 ? "" : "input-placeholder"}
        value={searchString}
        placeholder={TextResources.Inspector_SimpleTypes_Search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
      />
    </InputWrapper>
  );
};

export default SimpleTypesSearchBar;
