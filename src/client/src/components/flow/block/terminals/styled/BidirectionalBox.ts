import styled from "styled-components";

const BidirectionalBox = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  line-height: 2.5;
  width: 100%;
  height: 100%;

  .icon {
    height: auto;
    margin-right: 12px;
  }
`;

export default BidirectionalBox;
