import styled from "styled-components";

const TabHeader = styled.div`
  display: inline-block;
  box-sizing: border-box;
  margin-right: 0.4px;
  border-top-right-radius: 8px;
  border-top-left-radius: 4px;
  font-family: roboto;
  color: #000;

  height: ${(props: { active: string }) =>
    props.active ? "34.4px" : "31.4px"};

  margin-top: ${(props: { active: string }) => (props.active ? "0px" : "4px")};

  border-right: ${(props: { active: string }) =>
    props.active ? "1px solid #cbcbcb" : "1px solid #cbcbcb"};
  border-top: ${(props: { active: string }) =>
    props.active ? "1px solid #cbcbcb" : "0px solid #cbcbcb"};

  background-color: ${(props: { active: string }) =>
    props.active ? "#f2f2f2" : "#cbcbcb"};
  padding: ${(props: { active: string }) =>
    props.active ? "8px 20px 27px 20px;" : "8px 20px 0px 20px"};

  text-decoration: ${(props: { active: string }) =>
    props.active ? "underline" : "none"};
  font-weight: ${(props: { active: string }) =>
    props.active ? "bold" : "none"};

  &: hover {
    cursor: pointer;
  }
`;

export default TabHeader;
