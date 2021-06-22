import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    height: 160px;
    width: 250px;
`;
const ObjectsContainer = styled.div`
  border: solid 2px #898787;
  border-radius: 3px;
  width: 100%;
  height: 147px;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow: overlay;
`;
const ListElement = styled.div`
background-color: ${(props) => (props.index % 2 === 0 ? "#D9EAEB" : "white")};
--padding: 5px;
height: 29px;
cursor: pointer;
padding-left: 3px;
padding-top: 8px;
overflow-x: visible;
&:hover {
  text-decoration: underline;
}
`;


const ActiveTerminalTypeList = ({ terminals, title, onElementClick }) => {

  return (
    <Wrapper>
    <span>{title}</span>
    <ObjectsContainer>
      {terminals.map((n, i) => {
        return(<ListElement onClick={() => onElementClick(n.id)} index={i} key={n.id}>{n.name}</ListElement>)
      })}
    </ObjectsContainer>
    </Wrapper>
  );
};

export default ActiveTerminalTypeList;
