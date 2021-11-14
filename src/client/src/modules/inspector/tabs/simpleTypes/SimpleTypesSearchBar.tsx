import { ChangeEvent } from "react";
import { TextResources } from "../../../../assets/text";
import { FontSize } from "../../../../compLibrary/font";
import { Input } from "../../../../compLibrary/input/text";
import { InputWrapper } from "../terminals/styled";

interface Props {
  searchString: string;
  onChange: (value: string) => void;
}

const SimpleTypesSearchBar = ({ searchString, onChange }: Props) => (
  <InputWrapper>
    <Input
      fontSize={FontSize.Standard}
      className={searchString.length > 0 ? "" : "input-placeholder"}
      value={searchString}
      placeholder={TextResources.Inspector_SimpleTypes_Search}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
    />
  </InputWrapper>
);

export default SimpleTypesSearchBar;
