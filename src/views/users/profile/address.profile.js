import React, { useState, useRef } from 'react'

import { POST } from "../../../apicontroller/ApiController"

import { toast } from "react-toastify";

const Address = () => {

    const [image, setImage] = useState();

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];
    const header = { "x-access-token": localStorage.getItem("token") };

    const addressRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            address: addressRef.current.value,
        };
        POST("auth/update", formData, header).then((res) => {
            toast("User Successfully Address");
        })
    };


    return (
        <div className='Address'>
            <div className="" style={{ margin: "0 43px " }} >
                <form className="card-body">

                    <div>
                        <div className="form-group col-sm-12 pr-0">
                            <strong for="exampleInputEmail1">
                                Hello {user.name}
                                <span className="text-danger">*</span>
                            </strong>
                        </div>
                        <div className="form-group col-sm-12 pr-0">
                            <span for="exampleInputEmail1">
                                {user.address}
                            </span>
                        </div>
                    </div> <hr />

                    <div className="row">

                        <div className="form-group col-sm-12 pr-0">
                            <span for="exampleInputEmail1">
                                You Change your Address from Here !
                            </span>
                        </div>

                        <div className="form-group col-sm-12 pr-0">
                            <label for="exampleInputEmail1">
                                Your New Address
                                <span className="text-danger">*</span>
                            </label>
                           
                        </div>

                        <div className="row m-0 pt-3">
                            <button onClick={submit} className="save-button">
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default Address