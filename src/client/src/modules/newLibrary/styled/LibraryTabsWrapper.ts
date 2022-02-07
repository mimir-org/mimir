import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { Icon } from "../../../compLibrary/icon";

const LibraryTabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: inherit;
  border-bottom: 1.5px solid ${Color.BlueMagenta};
  align-items: center;

  > ${Icon} {
    align-self: center;
    margin: 4px 14px 0px 10px;
    width: 26px;
    height: 26px;
    cursor: pointer;
  }
`;

export default LibraryTabsWrapper;
