import "./roundcheckbox.scss";

export const RoundCheckbox = () => {
  const handleCheckboxChange = () => {};
  return (
    <>
      <label className={"roundcheckbox"}>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <span className="checked"></span>
      </label>
    </>
  );
};

export default RoundCheckbox;
