import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { GET } from '../../apicontroller/ApiController';

import { Link } from "react-router-dom";

const Options = ({ option }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const { category } = useParams()

    const [categories, setCategory] = useState({})



    const [supercategory, setSuperCategory] = useState({})

    useEffect(() => {

        GET(`supercategory`).then((result) => {
            setSuperCategory(result)
        })

        if (option.id) {

            GET(`category/super/${option.id}`).then((result) => {
                setCategory(result)
                console.log("result", result);
            })
        }

    }, [option.id])


    const SubMenuOptions = useMemo(() => {
        if (option && option.submenu && option.submenu.length > 0) {
            return option.submenu
        }

        if (option && categories.length > 0) {
            return categories
        }

        return []

    }, [categories, option.submenu])

    return (
        <>
            <div className="container"> 
                <span onClick={handleClick} style={{ cursor: 'pointer', color: 'white' }} >
                    <Link to={`/product/${SubMenuOptions[0]?.SuperCatgory}-${SubMenuOptions[0]?.spc_id}`} style={{ color: "white", textDecoration: 'none' }}>
                        {option.title}
                    </Link>

                </span>
                {/* <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
                    {SubMenuOptions && SubMenuOptions.map((item) =>
                        <MenuItem>
                            <img className="border" src={`${process.env.REACT_APP_AWS_URL}${item.image}`} style={{ objectFit: 'cover', width: '40%', height: '20px', marginRight: '1rem' }} />
                            <span>
                                {item.title}
                            </span>
                        </MenuItem>

                    )}
                </Menu> */}
            </div>
        </>
    );
}
export default Options;


