import "./roundcheckbox.scss";

interface Props {}

export const RoundCheckbox = ({}: Props) => {
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
