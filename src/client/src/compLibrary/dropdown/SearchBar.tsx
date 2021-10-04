import styled from "styled-components";

const SearchBar = styled.div`
  display: flex;
  flex: 1;
  max-height: 19px;
  align-items: center;
  flex-direction: row;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 2px 0px 2px 2px;
  background-color: inherit;

  .icon {
    margin-left: auto;
    width: 13px;
    height: 13px;
    opacity: 1;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  input[type="text"] {
    min-width: 220px;
    height: 14px;
    font-size: 13px;
    border: 0px;
    background-color: inherit;
  }

  input[type="text"]::placeholder {
    color: #898787;
    font-size: 13px;
    font-style: italic;
    opacity: 0.5;
  }
`;

export default SearchBar;
