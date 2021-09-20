import styled from "styled-components";

const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  font-size: 13px;
  position: absolute;
  top: 22.5px;
  left: 0px;
  z-index: 1;
  width: 100%;

  .dropdown_listitem {
    max-height: 16px;
    padding: 2px 0px 2px 4px;
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #cbcbcb;
    background-color: white;
  }

  .dropdown_listitem:hover {
    background-color: #bde6fd;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default DropdownList;
