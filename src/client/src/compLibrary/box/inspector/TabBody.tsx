import styled from "styled-components";

const TabBody = styled.div`
  top: 44px;
  position: absolute;
  width: 100%;
  height: 250px;
  overflow-y: auto;
  /* cursor: default; */

  .container {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: none;
    overflow-y: hidden;
  }
`;
export default TabBody;
