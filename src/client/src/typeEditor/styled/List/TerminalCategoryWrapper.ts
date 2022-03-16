import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontType, FontWeight } from "../../../compLibrary/font";

interface Props {
  expanded?: boolean;
  isSelected?: boolean;
}

const TerminalCategoryWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 3px 15px 3px 5px;
  min-height: 30px;
  border-bottom: ${(props) => (props.expanded ? "dashed 1px" + Color.LIGHT_SILVER : 0)};

  .terminal-name {
    font-weight: ${(props) => props.expanded && FontWeight.BOLD};
    text-decoration: ${(props) => props.expanded && "underline"};
    font-size: ${FontSize.SMALL};
  }

  .terminal-name:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  button {
    padding: 0;
    display: flex;
    align-items: center;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: ${FontWeight.BOLD};
    font-family: ${FontType.STANDARD};
    font-size: ${FontSize.TINY};
    color: ${Color.BLACK};

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
    font-weight: ${(props) => props.isSelected && FontWeight.BOLD};
  }
`;

export default TerminalCategoryWrapper;
