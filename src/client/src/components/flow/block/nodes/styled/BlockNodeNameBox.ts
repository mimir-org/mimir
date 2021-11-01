import styled from "styled-components";

const BlockNodeNameBox = styled.div`
  position: relative;
  padding: 15px 5px 0px 5px;
  left: 50%;
  transform: translateX(-50%);
  height: 15px;
  max-width: 140px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
`;

export default BlockNodeNameBox;
