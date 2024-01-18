import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body{
        background-color: #F4EAD8;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
    }

    *{
        box-sizing: border-box;
        font-family: "Nunito", sans-serif;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .h1{
        text-align: center;
        color: #9F7654;
        font-size: 3rem;
    }

   .score {
    color: #DF8B47;
    font-size: 1.2rem;
   }

   .start, .next{
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #DF8B47);
    border: 2px solid #DF8B47;
    padding: 5px 55px;
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
   }

   .img-button img{
    display: flex;
    justify-content: center;
    width: 400px;
    padding-bottom: 20px;

    .btn-container button{
        margin-top: 30px;
    }
   }
`;