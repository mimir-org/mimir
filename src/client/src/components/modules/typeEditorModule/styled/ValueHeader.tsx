import styled from "styled-components";

const ValueHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin: 2px 15px 0px 5px;
  height: 18px;
  border: 1px solid #898787;
  border-radius: 2px;
  background-color: white;
  padding: 2px;

  .selectedValues {
    max-height: 18px;
    max-width: 265px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 2px 4px;
    font-style: italic;
    font-size: 12px;
    color: #898787;
  }

  img {
    margin-left: auto;
    padding-right: 8px;
    width: 14px;
    height: 14px;
  }
`;

export default ValueHeader;
