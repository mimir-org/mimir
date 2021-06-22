import styled from "styled-components";
import { TrashIcon } from "../../../../assets/icons/common";
const ButtonContainer = styled.div`
    border: solid 1px #007079;
    border-radius: 5px;
    font-size: 14px;
    width: 79px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    :hover{
        background-color: #e6e6e6;
    }

`
const OuterButtonContainer = styled.div`
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
	align-items: center;

`
const DeleteNodeButton = ({ handleClick }) => {
    return (
        <OuterButtonContainer>
            <ButtonContainer onClick={ () => handleClick() }>
                Delete
                <img alt="Trash icon to delete node" src={TrashIcon}/>
            </ButtonContainer>
        </OuterButtonContainer>
    );
}
export default DeleteNodeButton;