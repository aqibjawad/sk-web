import React, { useState, useEffect } from 'react';

import { GET } from "../../apicontroller/ApiController"

import "./home.scss";

import Marquee from "react-fast-marquee";

const Appearl = () => {

    const [isPaused, setPaused] = useState(false);

    const [company, setCompany] = useState([])

    useEffect(() => {

        GET(`company`).then((result) => {
            setCompany(result)
        })

    }, [])

    const imageStyle = {
        margin: '0 15px', // Adjust the margin as needed
    };

    return (
        <div>
            <div className="companies-title">
                <p> Companies We Work With </p>
            </div>
            {/* <div className='mt-5' style={{backgroundColor:'white'}}>
            <Splide aria-label="My Favorite Images" options={{perPage: 3, rewind : true, gap: '1rem'}}>
            {company.map((companies) => (
                <SplideSlide>
                    <a href={`${companies.link}`} target='_blank'>
                     <img className="home-company-image"  src={`${process.env.REACT_APP_AWS_URL}${companies.image}`} />
                    </a>
                </SplideSlide>
                    ))}
 
            </Splide>
        </div> */}

            <Marquee>
                {company.map((companies) => (
                    <a href={`${companies.link}`} target='_blank' key={companies.id}>
                        <img style={imageStyle} className="home-company-image" src={`${process.env.REACT_APP_AWS_URL}${companies.image}`} alt={companies.name} />
                    </a>
                ))}
            </Marquee>
        </div>
    )
}

export default Appearl