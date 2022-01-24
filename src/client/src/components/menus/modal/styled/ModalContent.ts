import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 500px;
  min-height: 350px;
  border: 2px solid ${Color.BlueMagenta};
  background-color: ${Color.White};
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 30px;
`;

export default ModalContent;
