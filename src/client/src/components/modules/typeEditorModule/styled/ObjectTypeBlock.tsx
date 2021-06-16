import styled from "styled-components";

const ObjectTypeBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 45%;
  height: 70%;
  height: ${(props: { blockHeight: number }) => props.blockHeight + `%`};
  background-color: ${(props: { blockColor: string }) => props.blockColor};
  border: 1px solid #000000;
  border-radius: 2px;
`;

export default ObjectTypeBlock;
