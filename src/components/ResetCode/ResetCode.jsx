import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetCode = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { resetCode: "" },
        onSubmit: handleResetCode,
    });

    async function handleResetCode(values) {
        setIsLoading(true);
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
            setIsLoading(false);
            toast.success(data.status);

            if(data.status === 'Success'){
                navigate('/resetpassword')
            }


        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.statusMsg);
        }
    }

    return (
        <div>
            <div className="md:w-[90%] lg:w-[70%] mx-auto py-5 flex justify-center items-center mt-10">
                <div className="inner py-20 px-10 w-full">
                    <h1 className='pb-10 text-2xl'>Forget Password:</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="relative z-0 w-full mb-5 group py-5">
                            <input
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.resetCode}
                                name="resetCode"
                                id="resetCode"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                            />
                            <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Reset Code
                            </label>
                        </div>
                        <button
                            type='submit'
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetCode;
