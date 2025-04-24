import React, { useState } from 'react'

import { slide as Menu } from "react-burger-menu";
import { Link, useNavigate } from "react-router-dom";

import { AiFillDashboard, AiFillBank, AiOutlinePlus, AiFillShop, AiOutlineShopping } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { TbDetails } from "react-icons/tb";

import { Auth } from '../../../context/Auth.Context';


function RightSidebar() {

  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const auth = Auth();

  const logout = () => {
    auth.activateAuthentication(false);
    auth.activateToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshCycle");
    localStorage.removeItem("listingid");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div id="right-sidebar">
      <Menu left>

        <Link id="home" className="menu-item mt-3" to="/dashboard" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <AiFillDashboard style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              Dashboard
            </p>
          </div>

        </Link>


        <Link id="home" className="menu-item mt-1" to="/account" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <BsFillPersonFill style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              Profile Settings
            </p>
          </div>
        </Link>

        <Link id="home" className="menu-item mt-1" to="/bank" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <AiFillBank style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              Add Bank Details
            </p>
          </div>
        </Link>

        <Link id="home" className="menu-item mt-1" to="/shopbank" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <TbDetails style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              My Bank Details
            </p>
          </div>
        </Link>

        <Link id="home" className="menu-item mt-1" to="/signin" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <GrLogout style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p onClick={logout}>
              Logout
            </p>
          </div>
        </Link>

        <div className='menu-item mt-4' style={{ fontSize: '.875rem', fontWeight: 'bold' }}>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'> My Products </span>
          </div>
        </div>

        <Link id="home" className="menu-item mt-3" to="/addproduct" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <MdProductionQuantityLimits style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              Add Product
            </p>
          </div>
        </Link>

        <Link id="home" className="menu-item mt-3" to="/productdetails" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            {/* <FaBoxOpen style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} /> */}
            <p>
              Add Product Detials
            </p>
          </div>
        </Link>

        <Link id="home" className="menu-item mt-3" to="/shopproduct" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <AiFillShop style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              Shop Products
            </p>
          </div>
        </Link>

        <div className='menu-item mt-4' style={{ fontSize: '.875rem', fontWeight: 'bold' }}>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'> Announcements </span>
          </div>
        </div>

        <Link id="home" className="menu-item mt-3" to="/myannouncements" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <TfiAnnouncement style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              My Announcements
            </p>
          </div>
        </Link>

        <Link id="home" className="menu-item mt-3" to="/addannouncements" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <AiOutlinePlus style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              Add Announcements
            </p>
          </div>
        </Link>

        <div className='menu-item mt-4' style={{ fontSize: '.875rem', fontWeight: 'bold' }}>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'> Orders </span>
          </div>
        </div>

        <Link id="home" className="menu-item mt-3" to="/shop-order" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <AiOutlineShopping style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            <p>
              My Orders
            </p>
          </div>
        </Link>

        <Link id="home" className="menu-item mt-1" to="/notifications" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <div className='d-flex'>
            <GrLogout style={{ marginTop: '0.3rem', marginRight: '0.5rem', fontSize: '20px', color: 'white' }} />
            Notifications
          </div>
        </Link>

      </Menu>
    </div>
  );
}
export default RightSidebar;
