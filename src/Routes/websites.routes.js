import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

// ------------------- Users layout ----------------------------
import Layout from '../components/layout/layout.component';

import Home from '../views/home/index'
import AboutUs from '../views/about/about.trust';

import Category from '../views/category/category'
import CategoryInside from '../views/categoryinside'

import Buy from '../components/buy'

import Trust from '../views/about/about.trust'

import Signup from '../views/auth/signup';
import Signin from '../views/auth/signin'
import ForgetPassword from '../views/auth/ForgetPassword';

import Business from '../views/auth/shop/business'

import VerifyEmail from '../views/auth/verifyemail';

import ReviewInside from '../views/reviewsinside/index';

import UserInfo from '../views/users';

import Blog from '../views/blog/index'

import Careers from '../views/careers';

import Jobs from '../views/Jobs/Jobs';
import JobInside from '../views/Jobs/JobInside';
import ApplyNow from '../views/Jobs/Request';

import Pricing from '../views/footer/pricing/index'

import TermsCondition from '../views/TermsandConditions';

import Contact from '../views/contact/contact';

import Sales from '../views/contact/sales';

import BuyMethod from '../components/buy/buymethod.component';

const Routing = () => {
    return (
        <Layout>
            <Routes>
                <Route element={<Home />} path="/" exact={true} />
                <Route element={<AboutUs />} path="/aboutus" exact={true} />


                {/* <Route element={<Category />} path="/category" exact={true} />
                <Route element={<CategoryInside />} path="/categoryinside" exact={true} /> */}

                <Route element={<Category />} path="product/:category" exact={true} />
                <Route element={<CategoryInside />} path="product/:category/:param" exact={true} />
                
                <Route element={<Buy />} path="/buy" exact={true} />
                <Route element={<Trust />} path="/trust" exact={true} />

                <Route element={<Signup />} path="/signup" exact={true} />
                <Route element={<Signin />} path="/signin" exact={true} />
                <Route element={<ForgetPassword />} path="/forgetpassword" exact={true} />

                <Route element={<Business />} path="/business" exact={true} />
                <Route element={<VerifyEmail />} path="/verifyemail" exact={true} />

                <Route element={<ReviewInside />} path="/:category/:param/reviewinside" exact={true} />

                <Route element={<UserInfo />} path="/userinfo" exact={true} />

                <Route element={<Blog />} path="/blog" exact={true} />

                <Route element={<Careers />} path="/careers" exact={true} />

                <Route element={<Jobs />} path="/jobs" exact={true} />
                <Route element={<JobInside />} path="/career/:id" exact={true} />
                <Route element={<ApplyNow />} path="/applynow" exact={true} />

                <Route element={<Pricing />} path="/pricing" exact={true} />

                <Route element={<TermsCondition />} path="/term-condition" exact={true} />

                <Route element={<Contact />} path="/contactus" exact={true} />
                <Route element={<Sales />} path="/sales" exact={true} />

                <Route element={<BuyMethod />} path="/payment-cashier" exact={true} />

            </Routes>
        </Layout>
    )
}

export default Routing