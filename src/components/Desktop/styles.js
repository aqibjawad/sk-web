import styled from 'styled-components'

export const Div = styled.div`
    background-color: #232f3e;
`

export const SecondAppBar = styled.div`
    display: grid;
    grid-template-columns: repeat(12, auto);
    max-width: 100%;
    padding: 10px 15px;
    border-bottom: 1px solid #000000;
    margin: 0 auto;
`

export const Content1 = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
`
export const ImageCard = styled.img`
    width: 100%;
    height: 170px;
`

export const StyledToolbar = styled.div`
    display: grid !important;
    grid-template-columns: 2fr 2fr;
    padding: 10px;
    align-self: center;
    
`
export const Content2 = styled.div`
    display: grid;
    grid-template-columns: repeat(5, auto);
    align-items: center;
    justify-content: center;
`
export const Button1 = styled.button`
    font-size: 10px;
    color: #fff;
    display: flex;
    flex-direction: column;
    background-color: #000;
    span:nth-child(1){
        font-size: 16px;
    }
    span:nth-child(2){
        font-size: 20px;
    }
`

export const Content = styled.div`
    display: none;
    background-color: white;
    width: 36vh;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    position: absolute;
    padding: 1rem;
    z-index: 111111;
`

export const DropDown = styled.div`
    display: inline-block;
    &:hover{ 
        ${Content}{
            width:270px;
            display: grid;
            grid-template-columns: 1fr;
        }
    }
`