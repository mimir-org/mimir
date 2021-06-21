import styled from "styled-components";

const TabRow = styled.div`
  width: 100% !important;
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
  position: relative;
  max-width: 3300px;
  margin: auto;
  @media (min-width: 3000px) {
    max-width: 4200px;
  }
`;

export default TabRow;
