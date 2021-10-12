import styled from "styled-components";

const PreviewObjectBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 115px;
  background-color: ${(props: { blockColor: string }) => props.blockColor};
  border-radius: 10px;
  box-shadow: 0 5px 5px -2px rgb(0 0 0 / 20%);
`;

export default PreviewObjectBlock;
