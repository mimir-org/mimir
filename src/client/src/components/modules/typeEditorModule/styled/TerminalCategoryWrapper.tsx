import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const TerminalCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;

  p {
    margin-left: 10px;
  }

  button {
    width: 40px;
    height: 20px;
    margin-left: auto;
    padding-right: 10px;
    background: ${Color.LightGrey};
    border: 1px solid ${Color.BlueMagenta};
    border-radius: 2px;
    padding: 0px;
    white-space: nowrap;
    cursor: pointer;
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Medium};
    color: ${Color.Black};

    &:hover {
      border: 2px solid ${Color.BlueMagenta};
    }
  }

  .squarecheckbox {
    z-index: 0;
  }

  .category {
    padding-right: 10px;
  }

  img {
    margin-left: auto;
    padding-right: 12px;
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
