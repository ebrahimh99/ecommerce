import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";




const Forget = () => {




    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    let user = {
        email: "",
    }

    const validation = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    })



    async function ForgetUser(values) {

        setIsLoading(true)
        try {
            
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
            
            
            setIsLoading(false)
            
            if(data.statusMsg === 'success'){
                navigate('/resetcode')
            }
           

            toast.success(data.message)

        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message)
        }

    }




    const formik = useFormik({
        initialValues: user,
        onSubmit: ForgetUser,
        validationSchema: validation,
    })



    return (


        < div >
            <div className="md:w-[90%] lg:w-[70%]   mx-auto py-5 flex justify-center items-center mt-10">
                <div className="inner py-20 px-10 w-full">
                    <h1 className='pb-10 text-2xl'>Forget Password:</h1>


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





                        <button
                            type='submit'
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            {isLoading == true ?
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                : "submit"
                            }
                        </button>
                    </form>
                </div>
            </div>


        </div >
    )
}

export default Forget


