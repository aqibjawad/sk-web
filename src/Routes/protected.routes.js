import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

// ------------------- Users layout ----------------------------
import ShopLayout from "../components/layout/shoplayout.component"

import Dashboard from '../views/shop/dashboard/Dashboard'

import AddProduct from '../views/shop/products/AddProduct.js'

import Account from '../views/shop/account/Account'

import Photos from '../views/shop/photos/Photos'

import Bank from '../views/shop/bank/Bank'

const ProtectedRoutes = () => {

    return (
        <ShopLayout>
            <Routes>
                <Route element={<Dashboard />} path="/" exact={true} />
                <Route path="/addproduct" element={<AddProduct />} exact={true} />

                <Route path="/account" element={<Account />} exact={true} />

                <Route path="/photos" element={<Photos />} exact={true} />

                <Route path="/bank" element={<Bank />} exact={true} />
            </Routes>
        </ShopLayout>
    )
}

export default ProtectedRoutes