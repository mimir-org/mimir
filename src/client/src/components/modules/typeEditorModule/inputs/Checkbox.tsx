import "./checkbox.scss";

interface Props {}

export const Checkbox = ({}: Props) => {
  const handleCheckboxChange = () => {};
  return (
    <>
      <label className={"squarecheckbox"}>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <span className="scheckmark"></span>
      </label>
    </>
  );
};

export default Checkbox;
