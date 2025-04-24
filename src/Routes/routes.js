
// ------------------------------  This all are public website pages -------------------------------------------
import Home from '../views/home/index'
import Dashboard from '../views/shop/dashboard/Dashboard'

import Category from '../views/category/category'
import CategoryInside from '../views/categoryinside'

import Buy from '../components/buy'

import Signup from '../views/Auth/SignUp';
import Signin from '../views/Auth/SignIn'
import Verify from "../views/Auth/verify";

import ForgetPassword from '../views/Auth/ForgetPassword'

import Business from '../views/Auth/Business'

import SearchResults from "../views/search/search.js";

// import VerifyEmail from '../views/Auth/verifyemail';


import UserInfo from '../views/users';
import Profile from '../views/shop/Profile'

import Blog from '../views/blog/index'

import Careers from '../views/careers';

import Jobs from '../views/Jobs/Jobs';
import JobInside from '../views/Jobs/JobInside';
import ApplyNow from '../views/Jobs/Request';

import Pricing from '../views/footer/pricing/index'

import TermsCondition from '../views/TermsandConditions';

import Contact from '../views/contact/contact';
import Sales from '../views/contact/sales';

import AboutUs from '../views/about/about.trust';

import Languages from '../components/regions'

import Cart from '../components/Cart/Cart'

import ReviewInside from '../views/reviewsinside/index'

import CheckOut from '../components/buy/checkout.component'

import Invoice from '../components/buy/invoice.component'

import Notifications from '../views/users/notifications'


// ------------------- This pages are of Shop moodule Pages -----------------------------------------
import AddProduct from '../views/shop/products/AddProduct.js'

import ProductDetails from '../views/shop/products/ProductDetails'
import ShopProductDetails from '../views/shop/shopproducts/ProductDetails'

import Account from '../views/shop/account/Account'

import Bank from '../views/shop/bank/Bank'

import AllProducts from '../views/category/products'

 
import AddAnnouncements from '../views/shop/announcements/index.js'

import ShopBank from '../views/shop/bank/mybank'

import MyAnnouncements from '../views/shop/announcements/my'

import ShopProducts from '../views/shop/shopproducts/products'

import Order from '../views/shop/orders'

import MyNotification from '../views/shop/notification'

import ShopCatProducts from '../views/ShopCategory/index.js'

// ------------------- listing Shop -----------------------------------------

import Listing from '../views/Listing'
import ShopInside from '../views/ListingInside'

import Test from "../views/test/test.js"

const routes =[  
 
    {path:'/', element:<Home />, exact:'true', type:'public' },
    {path:'/dashboard', element:<Dashboard />, exact:'true', type:'private' },
 
    {path:'/product/:category', element:<Category />, exact:'true', type:'public' },
    {path:'/addproduct', element:<AddProduct />, exact:'true', type:'private' },

    {path:'/allproducts', element:<AllProducts />, exact:'true', type:'public' },

    // <Route path="/search-results" element={<SearchResults />} />
    {path:'/search-results', element:<SearchResults />, exact:'true', type:'public' },


 
    {path:'/product/:category/:param', element:<CategoryInside />, exact:'true', type:'public' },

    {path:'/shop', element:<Listing />, exact:'true', type:'public' },
    {path:'/shop/:name', element:<ShopInside />, exact:'true', type:'public' }, 


    {path:'/test', element:<Test />, exact:'true', type:'public' }, 

    {path:'/signup', element:<Signup />, exact:'true', type:'public' },
    {path:'/account', element:<Account />, exact:'true', type:'private' },


    {path:'/signin', element:<Signin />, exact:'true', type:'public' },
    {path:'/verify', element:<Verify />, exact:'true', type:'public' },
    {path:'/forget-password', element:<ForgetPassword />, exact:'true', type:'public' },

 
    {path:'/business', element:<Business />, exact:'true', type:'public' },
    {path:'/bank', element:<Bank />, exact:'true', type:'private' },


    {path:'/review/:category/:param', element:<ReviewInside />, exact:'true', type:'public' },

    {path:'/profile', element:<Profile />, exact:'true', type:'private' },


    {path:'/userinfo', element:<UserInfo />, exact:'true', type:'public' },
    {path:'/productdetails', element:<ProductDetails />, exact:'true', type:'private' },


    {path:'/blog', element:<Blog />, exact:'true', type:'public' },


    {path:'/careers', element:<Careers />, exact:'true', type:'public' },


    {path:'/jobs', element:<Jobs />, exact:'true', type:'public' },


    {path:'/career/:id', element:<JobInside />, exact:'true', type:'public' },


    {path:'/applynow', element:<ApplyNow />, exact:'true', type:'public' },

    {path:'/contactus', element:<Contact />, exact:'true', type:'public' },

    {path:'/sales', element:<Sales />, exact:'true', type:'public' },

    {path:'/term-condition', element:<TermsCondition />, exact:'true', type:'public' },

    {path:'/aboutus', element:<AboutUs />, exact:'true', type:'public' },

    {path:'/regions', element:<Languages />, exact:'true', type:'public' },

    {path:'/addcart', element:<Cart />, exact:'true', type:'public' },

    {path:'/pricing', element:<Pricing />, exact:'true', type:'public' },

    {path:'/buy', element:<Buy />, exact:'true', type:'public' },

    {path:'/checkout/:category/:param', element:<CheckOut />, exact:'true', type:'public' },


    {path:'/invoice/:category/:param', element:<Invoice />, exact:'true', type:'public' },

    {path:'/user-notifications', element:<Notifications />, exact:'true', type:'public' },

    {path:'/shop-category/:title', element:<ShopCatProducts />, exact:'true', type:'public' },


    // Shop Routes 
    
    {path:'/addannouncements', element:<AddAnnouncements />, exact:'true', type:'private' },

    {path:'/shopbank', element:<ShopBank />, exact:'true', type:'private' },

    {path:'/myannouncements', element:<MyAnnouncements />, exact:'true', type:'private' },

    {path:'/shopproduct', element:<ShopProducts />, exact:'true', type:'private' },

    {path:'/shop-order', element:<Order />, exact:'true', type:'private' },

    {path:'/notifications', element:<MyNotification />, exact:'true', type:'private' }, 

    {path:'/shopproductdetails', element:<ShopProductDetails />, exact:'true', type:'private' },

 ]

 export default routes