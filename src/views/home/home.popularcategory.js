import React, { useState, useEffect } from "react";

import { StyledContainer, Image, H1, P, TitleContainer, Title, ImageContent } from "./styles";

import { Link } from "react-router-dom";

import { GET } from "../../apicontroller/ApiController"


const PopularCategory = () => {

    const [supercategory, setSuperCategory] = useState([])

    useEffect(() => {

        GET(`supercategory`).then((result) => {
            setSuperCategory(result)
        })

    }, [])

    return (
        <div>
            <TitleContainer>
                <H1> Products </H1>
            </TitleContainer>
            <StyledContainer>
                {supercategory.map((supercatego) => (
                    <Link to={`/product/${supercatego.title.replaceAll(" ", "-").toLowerCase()}-${supercatego.id}`} style={{color: 'black', textDecoration: 'none'}}>
                        <ImageContent> 
                            <div className="d-flex justify-content-center mx-2">
                                <img className="border" src={`${process.env.REACT_APP_AWS_URL}${supercatego.image}`} style={{objectFit:'cover', width:'100%', height:'100px'}} />
                            </div>
                            <Title className="text-center"> {supercatego.title} </Title>
                        </ImageContent>
                    </Link>
                ))}
            </StyledContainer>
        </div>
    );
}
export default PopularCategory;