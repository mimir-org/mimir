import styled from "styled-components";
import { BlockviewArrowSmallIcon } from "../../../assets/";
import { FontSize } from "../../../componentLibrary";

const OffPageWrapper = styled.div`
  display: flex;
  width: 25px;
  height: 14px;
  border-radius: 100% / 50%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  /* background-image: ${BlockviewArrowSmallIcon}; */

  background: ${(props: { background: string; fontColor: string }) =>
    props.background};
  color: ${(props: { background: string; fontColor: string }) =>
    props.fontColor};

  .text {
    font-size: ${FontSize.Standard};
  }
`;

export default OffPageWrapper;
