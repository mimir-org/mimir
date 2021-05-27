import styled from "styled-components";

const ListElem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 21px;
  padding: 0px 4px 0px 0px;

  img {
    margin-left: auto;
    opacity: 0.4;
  }

  img:hover {
    opacity: 1;
  }
`;

export default ListElem;
