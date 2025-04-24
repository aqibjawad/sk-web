import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { GET } from "../../apicontroller/ApiController"

const Products = () => {

    const [topCat, setTopCat] = useState([])

    useEffect(() => {

        GET(`supercategory/top`).then((result) => {
            setTopCat(result)
        })
 

    }, [])


    return (
        <div style={{ marginTop: '1.5rem' }}>
            <div style={{ borderRadius: '15px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', backgroundColor: "#333333", padding: '0.1rem' }}>
                <h3 className="text-center text-white" style={{ margin: '0.5rem 0' }}>Top Categories</h3>
                {topCat.slice(0, 6).map((topcat, index) => (
                    <Link key={index} to={`/product/${topcat.title.replaceAll(" ", "-").toLowerCase()}-${topcat.id}`} style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '0.25rem 0' }}>
                        <div className="d-flex align-items-center" style={{ margin: '0.25rem' }}>
                            <img src={`${process.env.REACT_APP_AWS_URL}${topcat.image}`} alt={topcat.title} style={{ objectFit: 'contain', width: '15%', maxHeight: '30px', marginRight: '0.5rem', marginLeft:'0.5rem' }} />
                            <div style={{ fontSize: '16px', margin: 0 }}>{topcat.title}</div>
                        </div>
                        <hr style={{ margin: 0 }} />
                    </Link>
                ))}

                <div>
                    <Link to="/allproducts" style={{ textDecoration: 'none', fontWeight: 'bold', display: 'block', textAlign: 'center', margin: '0.5rem 0' }}>
                        <div className="text-danger" style={{ fontSize: '20px' }}>More Categories</div>
                    </Link>
                </div>
            </div>
        </div>



    );
}
export default Products;