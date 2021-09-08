import styled from "styled-components";

const TerminalCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;
  background-color: inherit;

  .squarecheckbox {
    z-index: 0;
  }

  .category {
    padding-right: 10px;
  }

  img {
    margin-left: auto;
    padding-right: 8px;
    width: 14px;
    height: 14px;
  }

  .help-icon {
    width: 12px;
    height: 12px;
    opacity: 0.4;
  }

  .help-icon:hover {
    opacity: 1;
  }

  .locationAttribute {
    padding: 9px 5px;
  }
`;

export default TerminalCategoryWrapper;
