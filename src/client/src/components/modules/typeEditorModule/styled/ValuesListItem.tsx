import styled from "styled-components";

const ValuesListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-color: #898787;
  border-style: solid;
  border-radius: 2px;
  height: 20px;
  padding: 2px;

  :hover {
    background: #bde6fd;
  }

  p::first-letter {
    text-transform: uppercase;
  }

  .help-icon {
    margin-left: auto;
    margin-right: 8px;
    width: 12px;
    height: 12px;
    opacity: 0.4;
  }

  .help-icon:hover {
    opacity: 1;
  }
`;

export default ValuesListItem;
