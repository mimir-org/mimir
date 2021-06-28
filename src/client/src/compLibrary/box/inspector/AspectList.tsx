import styled from "styled-components";

const AspectList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 160px;
  overflow-y: ${(props: { count: any }) => props.count > 3 ? 'scroll' : 'visible' }
`;
export default AspectList;
