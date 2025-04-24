import styled from 'styled-components'

export const Bar= styled.div`
    padding: 1rem
`

export const H1= styled.div`
    font-size: 20px;
    font-weight: bold;
`
 
export const P= styled.div`
    padding-top: 0.5rem;
    text-align: center;
`

export const ShopBar= styled.div`
    padding-left: 2rem;
    padding-top : 2rem;
`

export const Content = styled.div`
    display: none;
    background-color: white;
    width: 30vh;
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
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
`