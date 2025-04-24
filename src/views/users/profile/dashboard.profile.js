import React, { useState, useRef } from 'react'

const Dashboard = () => {

    const [image, setImage] = useState();

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];
    const header = { "x-access-token": localStorage.getItem("token") };


    return (
        <div className='Dahboard'>
            <div className="" style={{ margin: "0 43px " }} >
                <form className="card-body">

                    <div className="row">
                        <div className="form-group col-sm-6 pr-0">
                            <strong for="exampleInputEmail1">
                                Hello {user.name}
                                <span className="text-danger">*</span>
                            </strong>
                        </div>

                        <div className="form-group col-sm-12 pr-0">
                            <span for="exampleInputEmail1">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                                essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including 
                                versions of Lorem Ipsum.
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Dashboard