import { NumericInput } from "../../../../../componentLibrary";

interface Props {
  terminal: any;
}

export const AddTerminal = ({ terminal }: Props) => {
  return (
    <>
      <NumericInput>
        <label className={"quantity"}>
          <input
            type="number"
            min="0"
            placeholder="0"
            // onChange={numberInput}
          />
          <span className="number"></span>
        </label>
      </NumericInput>
      <p>Terminal name</p>
    </>
  );
};

export default AddTerminal;
