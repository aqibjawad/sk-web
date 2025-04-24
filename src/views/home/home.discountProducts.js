import React, { useState, useEffect } from 'react'

import { GET } from "../../apicontroller/ApiController"
import { Link } from 'react-router-dom'

import './home.css'

import { Glide } from 'react-glide';
import 'react-glide/lib/reactGlide.css';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Carousel from 'react-bootstrap/Carousel';


const DiscountProduct = () => {

    const [DiscountCategory, setDiscountCategory] = useState([]);

    useEffect(() => {
        GET(`category/discount`).then((result) => {
            console.log(result); // Check the structure of the API response
            setDiscountCategory(result);
        });
    }, []);

    const handleOnSlideChange = (e) => {
        // Handle slide change event
    };


    const settings = {
        type: 'carousel', // Set the type to 'carousel'
        peek: 50, // Adjust peek value as needed
        perView: 1, // Number of items per view
        gap: 20, // Adjust gap between items as needed
        autoplay: 3000, // Autoplay interval in milliseconds
    };

    return (
        <div className='mt-3'>

            {/* <Glide {...settings}>
                {DiscountCategory.discount?.map((categ) => (
                    // <div key={categ.id}>
                    //     {categ.image ? (
                    //         <img className="home-shop-image" src={`${process.env.REACT_APP_AWS_URL}${categ.image}`}/>
                    //     ) : (
                    //         <img className="home-shop-image" src="https://i.stack.imgur.com/SE2cv.jpg" />
                    //     )}
                    // </div>

                    <div>
 
                    </div>
                ))}
            </Glide> */}

            {/* <AliceCarousel
                mouseTracking
                items={DiscountCategory.discount?.map((categ) => (
                    <div key={categ.id}>
                        {categ.image ? (
                            <img className="home-shop-image" src={`${process.env.REACT_APP_AWS_URL}${categ.image}`} />
                        ) : (
                            <img className="home-shop-image" src="https://i.stack.imgur.com/SE2cv.jpg" />
                        )}
                    </div>
                ))}
                responsive={{
                    0: { items: 1 },
                    600: { items: 1 },
                    1024: { items: 1 },
                }}
                onSlideChanged={handleOnSlideChange}
            /> */}

            <Carousel>

                <Carousel.Item interval={1000}>
                    {DiscountCategory.discount?.map((categ) => (
                        <div key={categ.id}>
                            <img className="home-shop-image" src={`${process.env.REACT_APP_AWS_URL}${categ.image}`} />
                        </div>
                    ))}

                </Carousel.Item>

            </Carousel>
        </div>
    )
}

export default DiscountProduct