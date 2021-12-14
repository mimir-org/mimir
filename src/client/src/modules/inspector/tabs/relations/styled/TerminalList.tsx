import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  hasItems: boolean;
}

const TerminalList = styled.div<Props>`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  border: ${(props) => getBorder(props.hasItems)};
  border-radius: 5px;

  :first-child {
    border: none;
  }

  :last-child {
    border: ${(props) => getBorder(props.hasItems)};
    border-radius: 5px;
  }
`;

const getBorder = (hasItems: boolean) => (hasItems ? `1px solid ${Color.Black}` : "none");

export default TerminalList;
