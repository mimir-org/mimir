import styled from "styled-components";

const SearchBarList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: white;
  font-size: 13px;
  position: absolute;
  top: 21px;
  left: 0px;
  z-index: 888888888;
  width: 100%;

  .terminallistitem {
    max-height: 16px;
    padding: 2px 0px 2px 4px;
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #cbcbcb;
    background-color: white;
  }

  .terminallistitem:hover {
    background-color: #bde6fd;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default SearchBarList;
