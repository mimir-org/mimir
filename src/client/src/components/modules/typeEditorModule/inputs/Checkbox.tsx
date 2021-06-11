import "./checkbox.scss";

export const Checkbox = () => {
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
