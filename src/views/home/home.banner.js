import React, { useState, useEffect } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import { GET } from "../../apicontroller/ApiController"

import "./home.scss"; 

const Banner = () => { 

    const [crousalone, setCrousalOne] = useState([])

    useEffect(() => { 
    
        GET(`crousalone`).then((result) => {
            setCrousalOne(result)
        })

        
      }, []) 
 
    return (  
        <div>
            <Carousel className='mt-3'>
                {crousalone.map((supercat) => (
                    <Carousel.Item>
                    <a href={`${supercat.link}`} target='_blank'>
                        <img className="home-banner-image" src={`${process.env.REACT_APP_AWS_URL}${supercat.image}`}  />
                        <Carousel.Caption>
                            <h3 style={{ textShadow:'0px 1px 10px rgba(0,0,0,0.3)'}}> {supercat.title} </h3>
                        </Carousel.Caption>
                        </a>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default Banner