import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
const Navbar = () => {
    const { numOfItems } = useContext(CartContext)

    const { token, setToken } = useContext(AuthContext)
    const navigate = useNavigate()
    function logOut() {
        setToken(null);
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <nav className="bg-white fixed dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">

            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/home" className="flex  items-center space-x-3 rtl:space-x-reverse">
                    <i className="fa-solid fa-cart-shopping text-green-600 fa-2xl"></i>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        FreshCart
                    </span>
                </Link>


                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">


                    {token ?
                        <>
                            <Link to="/cart">
                                <button
                                    type="button"
                                    className="me-5 relative">
                                    <i className="fa-solid fa-cart-shopping text-gray-500 text-2xl"></i>
                                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                                        {numOfItems}
                                    </div>
                                </button>
                            </Link>









                            <button
                                onClick={logOut}
                                type="button"
                                className="mx-2  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                LogOut
                            </button>
                        </>
                        :
                        <>
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="mx-2  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button
                                    type="button"
                                    className="mx-2  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    SignUp
                                </button>
                            </Link>
                        </>
                    }









                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>



                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {token ?
                            <>
                                <li>
                                    <NavLink to="/home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
                                        Products

                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                                        Categories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/brand" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        Brand
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/allorders" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        All Orders
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/wishlist" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                                        Wish List

                                    </NavLink>
                                </li>
                            </>
                            : ""}
                    </ul>
                </div>
            </div>
        </nav>










    )
}

export default Navbar
