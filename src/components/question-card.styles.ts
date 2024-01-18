import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #FFF7F1;
    width: 300px;
    padding: 30px;
    border-radius: 40px;

    .question{
        font-weight: 900;
    }
    
    .answer{
        font-weight: 900;
        font-size: 1.2rem;
    }
`

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
  };

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
transition: all 0.3s ease;

:hover {
  opacity: 0.8;
}

button{
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    width: 100%;
    height: 35px;
    margin: 6px 0;
    background:  ${({ correct, userClicked }) =>
    correct
      ? 'linear-gradient(90deg, #E6BB6C, #C68B1D)'
      : !correct && userClicked
      ? 'linear-gradient(90deg, #A28B63, #735F3D)'
      : 'linear-gradient(90deg, #F4E2BA, #D2B46F)'};
      border: 3px solid #735F3D;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #000000;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
}
`