import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { slide as Menu } from "react-burger-menu";

import '../main.scss'

const Leftheader = () => {

    const [open, setOpen] = useState()

    return (

        <div className='right-sidebar'>
            <Menu left className="menu-item" isOpen={open}>

                <Link id="home" className="menu-item" to="/signin" onClick={() => setOpen(false)}>
                    <p>
                         Dashboard
                    </p>
                </Link>

                <Link id="home" className="menu-item" to="/signup" onClick={() => setOpen(false)}>
                    <p>
                         Sign Up
                    </p>
                </Link>

                <Link id="home" className="menu-item" to="/about" onClick={() => setOpen(false)}>
                    <p>
                        About Us
                    </p>
                </Link>
            </Menu>
        </div>
    )
}

export default Leftheader