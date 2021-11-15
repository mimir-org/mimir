import styled from "styled-components";
import Color from "../colors/Color";

const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.White};
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 5px;
  padding: 1px;
  font-size: 11px;
  position: absolute;
  top: 23px;
  left: 0px;
  max-height: 40px;
  width: 95%;
  z-index: 1;

  .dropdown_listitem {
    border-bottom: 1px solid ${Color.DarkGrey};
    background-color: ${Color.White};
    padding: 2px 5px;
  }

  .dropdown_listitem:hover {
    background-color: #bde6fd;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default DropdownList;
