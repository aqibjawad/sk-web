import React, { useEffect, useMemo, useState } from "react"
import Increment from "./Increment.Cart";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBTypography,
} from "mdb-react-ui-kit";
import { AiFillDelete } from 'react-icons/ai';

const ProductCart = ({ categ, cartPrice, setCartPrice, removeCart, onRemoveProduct }) => {

    const [quantity, setQuantity] = useState(1)
    console.log("Category", categ,cartPrice)

    const price = useMemo(() => quantity * categ.price
    , [quantity])

    useEffect(()=> setCartPrice(prev => { return { ...prev, [categ.id]: price }}), [price, categ])

    return (
        <MDBCard className="mb-3">

            <MDBCardBody>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div>
                            <MDBCardImage
                                src={`${process.env.REACT_APP_AWS_URL}${categ.image}`}
                                className="rounded-3" style={{ width: '200px', height: '100px' }} fluid
                                alt="Shopping item" />
                        </div>
                        <div className="ms-3 ml-3">
                            <MDBTypography >
                                {categ.Category}
                            </MDBTypography>
                            <p className="small mb-0">
                                {categ.SuperCategory}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div style={{ width: "50px", marginRight: '5rem' }}>
                            <MDBTypography tag="h5" className="fw-normal mb-0">
                                <Increment quantity={quantity} setQuantity={setQuantity} />
                            </MDBTypography>
                        </div>
                        <div className="d-flex" style={{ width: "120px" }}>

                        <MDBTypography tag="h5" className="mb-0">
                                {categ.currency}
                            </MDBTypography>

                            <MDBTypography tag="h5" className="mb-0">
                                {price}
                            </MDBTypography>
                        </div>
                        
                        <AiFillDelete style={{color:'red'}} onClick={() => onRemoveProduct(categ.id)}  />
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}
export default ProductCart