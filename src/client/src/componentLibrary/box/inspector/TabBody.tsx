import styled from "styled-components";

const TabBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 220px;
  overflow-y: auto;

  .container {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: none;
    overflow-y: hidden;
  }
`;
export default TabBody;
