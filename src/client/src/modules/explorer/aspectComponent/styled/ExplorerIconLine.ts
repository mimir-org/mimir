import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";

interface Props {
  isHidden?: boolean;
  isLocked?: boolean;
  isVisible?: boolean;
}

const ExplorerIconLine = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 0px 8px;
  border-right: 2px solid ${Color.InspectorGreyBorder};

  .visible-icon {
    width: 18px;
    height: 14px;
    opacity: ${(props) => (props.isHidden ? 0.5 : 1)};
    cursor: pointer;
  }

  .lock-icon {
    width: 12px;
    height: 14px;
    opacity: ${(props) => (props.isLocked ? 0.5 : 1)};
    cursor: pointer;
  }

  .visible-icon:hover,
  .lock-icon:hover {
    opacity: ${(props) => (!props.isHidden || !props.isLocked ? 0.5 : 1)};
  }
`;

export default ExplorerIconLine;
