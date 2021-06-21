import { useState } from "react";
import {
  ExpandedIcon,
  CollapsedIcon,
} from "../../../../../../assets/icons/common";
import "./terminalsearchbar.scss";

interface Props {
  terminals: any;
}

export let TerminalSearchBar = ({ terminals }: Props) => {
  const [searchbarInput, setsearchbarInput] = useState("");
  const [expandList, setExpandList] = useState(false);

  const handleChange = (e) => {
    setsearchbarInput(e.target.value);
  };

  const handleClick = (terminalId) => {
    // console.log("Clicked terminal media id: ", terminalId);
  };

  const toggleExpand = () => {
    setExpandList((expandList) => !expandList);
  };

  return (
    <div className="terminalsearchbar_container">
      <div className="terminalsearchbar">
        <label htmlFor="terminalsearch" />
        <input
          type="text"
          value={searchbarInput}
          placeholder="Search or Select Terminal Media Type"
          onChange={handleChange}
        />
        <img
          src={expandList ? ExpandedIcon : CollapsedIcon}
          alt="expand-icon"
          onClick={toggleExpand}
          className="icon"
        />
      </div>
      {expandList && (
        <div className="terminalsearchbarlist">
          {terminals.map((terminal) => {
            return (
              <div
                className="terminallistitem"
                onClick={() => handleClick(terminal.id)}
              >
                {terminal.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TerminalSearchBar;