import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "../../../../compLibrary";

const TerminalCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;

  .terminal-name {
    font-size: ${FontSize.Small};
    margin-left: 16px;
  }

  .terminal-name:hover {
    font-weight: ${FontWeight.Bold};
    text-decoration: underline;
    cursor: pointer;
  }

  button {
    display: flex;
    align-items: center;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: ${FontWeight.Bold};
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Tiny};
    color: ${Color.Black};

    .add-text {
      margin-left: 3px;
    }

    .add-icon {
      width: 8px;
      height: 8px;
    }
  }

  .delete-button {
    margin-left: auto;

    .delete-text {
      margin-left: 3px;
      margin-right: 10px;
    }
  }

  .squarecheckbox {
    z-index: 0;
  }

  .category {
    padding-right: 10px;
  }

  /* img {
    margin-left: auto; 
    padding-right: 12px;
    width: 14px;
    height: 14px;
  } */

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
