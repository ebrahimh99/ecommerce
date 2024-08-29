import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from "yup";
import { AuthContext } from '../../Context/authContext';


const Login = () => {


  const { setToken } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  let user = {
    email: "",
    password: "",
  }

  const validation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required("password Is Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, "Invalid password"),
  })



  async function loginUser(values) {
    setIsLoading(true)
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      toast.success(res.data.message)
      setIsLoading(false)
      navigate("/home")




      setToken(res.data.token)
      localStorage.setItem("token", res.data.token)

    } catch (error) {

      toast.error(error.response.data.message)
      setIsLoading(false)

    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: validation,
  })



  return (


    < div >
      <div className="md:w-[90%] lg:w-[70%]   mx-auto py-5 flex justify-center items-center mt-10">
        <div className="inner py-20 px-10 w-full">
          <h1 className='pb-10 text-2xl'>Login:</h1>




          <form onSubmit={formik.handleSubmit}>

            {/* input email */}
            <div className="relative z-0 w-full mb-5 group py-5">
              <input
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>

            {formik.errors.email && formik.touched.email ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">error: </span> {formik.errors.email}
              </div>) : ""}






            {/* input password */}
            <div className="relative z-0 w-full mb-5 group py-5">
              <input
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password" id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            {formik.errors.password && formik.touched.password ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">error: </span> {formik.errors.password}
              </div>) : ""}






            <button
              type='submit'
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading == true ?
                <i className="fa-solid fa-spinner fa-spin"></i>
                : "Login"
              }
            </button>

            <p className='text-center py-5'>dont have account <span className='ps-1'>
            <Link to="/register"className='text-green-700 font-bold underline'>
              Register
              </Link>
              </span>   
            </p>

            <p className='text-center '>
              <Link to="/forget"
              className='text-green-700 font-bold underline'>Forget Password</Link>
            </p>
          </form>
        </div>
      </div>


    </div >
  )
}

export default Login

