import styled from "styled-components";

const TerminalCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;

  .category {
    padding-right: 10px;
  }

  img {
    margin-left: auto;
    padding-right: 8px;
    width: 14px;
    height: 14px;
  }
`;

export default TerminalCategoryWrapper;
