import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "../../compLibrary";

interface Props {
  expanded?: boolean;
  isSelected?: boolean;
}

const TerminalCategoryWrapper = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;
  border-bottom: ${(props) => (props.expanded ? "dashed 1px" + Color.DarkGrey : 0)};

  .terminal-name {
    font-weight: ${(props) => props.expanded && FontWeight.Bold};
    text-decoration: ${(props) => props.expanded && "underline"};
    font-size: ${FontSize.Small};
    margin-left: 9px;
  }

  .terminal-name:hover {
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

  label:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  label {
    text-decoration: ${(props) => props.isSelected && "underline"};
    font-weight: ${(props) => props.isSelected && FontWeight.Bold};
    /* padding-right: 10px; */
  }
`;

export default TerminalCategoryWrapper;
