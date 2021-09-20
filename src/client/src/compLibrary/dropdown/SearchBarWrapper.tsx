import styled from "styled-components";

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  .helpIcon {
    height: 12px;
    padding: 3px 10px 0px 10px;
    margin-left: auto;
    opacity: 0.4;
  }

  .helpIcon:hover {
    opacity: 1;
  }
`;

export default SearchBarWrapper;
