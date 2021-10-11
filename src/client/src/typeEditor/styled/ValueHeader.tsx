import styled from "styled-components";
import { FontSize, Color } from "../../compLibrary";

const ValueHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 307px;
  min-height: 20px;
  border: 1px solid ${Color.Black};
  border-radius: 5px;
  margin: 5px 0px 5px 32px;
  background-color: ${Color.White};

  .selectedValues {
    max-height: 20px;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 2px 13px 2px 13px;
    font-size: ${FontSize.Medium};
    color: ${Color.Black};
  }

  img {
    margin-left: auto;
    padding-right: 7px;
    width: 10px;
    height: 6px;
  }
`;

export default ValueHeader;
