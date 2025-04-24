import styled from 'styled-components'

export const StyledContainer=styled.div`
    padding: 1rem;
    display:flex;
    overflow:scroll; 
    width:100%;
    overflow-y:hidden;
`
 
export const Image= styled.div`
    background-size: cover;
    width: 100px;
    border-radius: 50%;
    height: 100px;
` 
export const ImageContent= styled.div`
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center;
`

export const Title= styled.div`
    margin-top: 5px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    font-family: Roboto-Regular;
`

export const H1= styled.div`
    font-weight: bold;
    font-size: 22px;
`

export const P= styled.div`
    font-size: 20px;
    margin-left: 20px; 
    font-family: Roboto-Regular;
`

export const TitleContainer= styled.div`
    display: flex;
    font-family: Roboto-Regular;
`

export const ImageCard= styled.img`
    width: 100%;
    height: 170px;
`

export const ImageContentCard= styled.div`
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center;
    &:hover{
        background-color: red !important;
        z-index: 10;
    }
`

export const StyledContainerContent=styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.5rem;
    margin-top: 20px;
`