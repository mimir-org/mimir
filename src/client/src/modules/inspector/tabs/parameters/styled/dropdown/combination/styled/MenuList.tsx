import styled from "styled-components";

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${(props) => props.color};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 31px;
  left: 0;
  width: 102%;
  max-height: 138px;
  overflow-y: auto;
  z-index: 1;

  div:not(:first-child) {
    border-top: 1.5px solid ${(props) => props.color};
  }
`;

export default MenuList;
