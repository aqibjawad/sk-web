import React, { useState } from 'react'

import MyProfile from './profile/myprofile.profile';
import MyAddress from './profile/address.profile';
import Dashboard from './profile/dashboard.profile';
import Account from './profile/account.profile';
import Save from './saveitems';
import Notifications from './notifications';
import Order from './orders';

import Row from 'react-bootstrap/Row';
import { BiLocationPlus } from 'react-icons/bi';


const UserInfo = () => {

    const [active, setActive] = useState(1);


    return (

        <Row>
            <div className='d-flex flex-column col-sm-3 ml-5 mt-3 mb-3'>
                <button style={{ backgroundColor: active === 1 ? "#333333" : "lightgrey", color: active === 1 ? "white" : "black" }} onClick={() => setActive(1)} className={` btn ${active === 1 ? "activeBtn" : ""}`} > Dahboard </button>
                {/* <button style={{ backgroundColor: active === 2 ? "#333333" : "lightgrey", color: active === 2 ? "white" : "black", marginTop: '0.5rem' }} onClick={() => setActive(2)} className={` btn ${active === 2 ? "activeBtn" : ""}`} > Address </button> */}
                <button style={{ backgroundColor: active === 3 ? "#333333" : "lightgrey", color: active === 3 ? "white" : "black", marginTop: '0.5rem' }} onClick={() => setActive(3)} className={` btn ${active === 3 ? "activeBtn" : ""}`} > Account Details </button>
                {/* <button style={{ backgroundColor: active === 4 ? "#333333" : "lightgrey", color: active === 4 ? "white" : "black", marginTop: '0.5rem' }} onClick={() => setActive(4)} className={` btn ${active === 4 ? "activeBtn" : ""}`} > Update Account  </button> */}
                <button style={{ backgroundColor: active === 5 ? "#333333" : "lightgrey", color: active === 5 ? "white" : "black", marginTop: '0.5rem' }} onClick={() => setActive(5)} className={` btn ${active === 5 ? "activeBtn" : ""}`} > Save Product  </button>
                {/* <button style={{ backgroundColor: active === 6 ? "#333333" : "lightgrey", color: active === 6 ? "white" : "black", marginTop: '0.5rem' }} onClick={() => setActive(6)} className={` btn ${active === 6 ? "activeBtn" : ""}`} > Notifications  </button> */}
                <button style={{ backgroundColor: active === 7 ? "#333333" : "lightgrey", color: active === 6 ? "white" : "black", marginTop: '0.5rem' }} onClick={() => setActive(7)} className={` btn ${active === 6 ? "activeBtn" : ""}`} > Your Orders  </button>
            </div>
            <div className='col-sm-7'>
                {active === 1 ? (
                    <Dashboard />
                ) : (
                    <>
                    </>
                )}

                {active === 2 ? (
                    <MyAddress />
                ) : (
                    <>
                    </>
                )}

                {active === 3 ? (
                    <Account />
                ) : (
                    <>
                    </>
                )}

                {active === 4 ? (
                    <MyProfile />
                ) : (
                    <>
                    </>
                )}

                {active === 5 ? (
                    <Save />
                ) : (
                    <>
                    </>
                )}

                {active === 6 ? (
                    <Notifications />
                ) : (
                    <>
                    </>
                )}

                {active === 7 ? (
                    <Order />
                ) : (
                    <>
                    </>
                )}
            </div>
        </Row>

    )
}

export default UserInfo