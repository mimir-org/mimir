import styled from "styled-components";
import { GetPropertiesHeight } from "../helpers/GetPropertiesHeight";

const ChooseProperties = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 20px;
  position: relative;
  height: ${GetPropertiesHeight(true)}px;
`;

export default ChooseProperties;
