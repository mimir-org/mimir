import { useState, useEffect } from "react";
import { InputType } from "..";
import { InputContainer } from "./containers/";
import { Color } from "../../compLibrary";

/**
 * Props.
 */
interface Props {
  id: string;
  defaultValue?: string | number;
  inputType?: InputType;
  readonly?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  roundedCorner?: boolean;
  onChange?: Function;
  onBlur?: Function;
  validate?: Function;
}

/**
 * Input component.
 */
export const Input = ({
  id,
  defaultValue = "",
  inputType = InputType.Text,
  readonly = false,
  borderColor = Color.DarkGrey,
  backgroundColor = Color.White,
  roundedCorner = true,
  onChange,
  onBlur,
  validate,
}: Props) => {
  const [value, setValue] = useState(defaultValue ?? "");
  const [error, setError] = useState("");

  const handleValidate = (value) => {
    if (!validate) return "";

    return validate(value);
  };

  const handleChange = (e: any) => {
    const value = e.target.value ? e.target.value : "";

    const error = handleValidate(value);
    setValue(value);
    setError(error);

    if (onChange) {
      onChange(id, value, error?.length > 0);
    }
  };

  const handleBlur = (e: any) => {
    const value = e.target.value ? e.target.value : "";

    const error = handleValidate(value);
    setValue(value);
    setError(error);

    if (onBlur) {
      onBlur(id, value, error?.length > 0);
    }
  };

  const inputTypeString = () => {
    switch (inputType) {
      case InputType.Text:
        return "text";
      case InputType.Nummeric:
        return "number";
      default:
        return "text";
    }
  };

  useEffect(() => {
    const error = handleValidate(value);
    setError(error);
  }, []);

  return (
    <InputContainer
      borderColor={error ? Color.Red : borderColor}
      backgroundColor={readonly ? Color.LightGrey : backgroundColor}
      roundedCorner={roundedCorner}
    >
      <input
        type={inputTypeString()}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && <div className="error">{error}</div>}
    </InputContainer>
  );
};

export default Input;
