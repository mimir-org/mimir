import styled from "styled-components";

const SearchBarListItem = styled.div`
  max-height: 16px;
  padding: 2px 0px 2px 4px;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #d9d9d9;
  background-color: white;

  &:hover {
    background-color: #d9e6ff;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default SearchBarListItem;
