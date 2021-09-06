import styled from "styled-components";

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.3;
  font-size: 13px;
  color: black;
  position: relative;
  padding: 1px 0 1px 0;

  .dropdown_header {
    display: flex;
    flex-direction: row;
    flex: 1;
    min-width: 83px;
    max-height: 20px;
    background-color: white;
    align-items: center;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
  }

  p {
    padding: 0px 4px;
  }

  img {
    width: 13px;
    height: 13px;
    opacity: 1;
    margin-left: auto;
    padding: 4px;
  }
`;

export default DropdownContainer;
