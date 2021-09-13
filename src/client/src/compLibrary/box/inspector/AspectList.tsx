import styled from "styled-components";
import { Color } from "../..";

const AspectList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 10px 10px 5px;
  border: 1px solid ${Color.Black};
  border-radius: 5px;

  overflow-y: ${(props: { count: any }) =>
    props.count > 3 ? "scroll" : "visible"};
`;
export default AspectList;
