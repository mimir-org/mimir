import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

const AspectBoxesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
  padding: 12px 0 4px 0;

  background: linear-gradient(to right, ${Color.FunctionMain}, ${Color.ProductMain}, ${Color.LocationMain}) left bottom no-repeat;
  background-size: 100% 2px;
`;

export default AspectBoxesWrapper;
