import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/authContext';

const ResetPassword = () => {
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    newPassword: Yup.string()
      .required('Password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Invalid password'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  async function handleResetPassword(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      setIsLoading(false);
      

      // Set token and navigate if applicable
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div>
      <div className="md:w-[90%] lg:w-[70%] mx-auto py-5 flex justify-center items-center mt-10">
        <div className="inner py-20 px-10 w-full">
          <h1 className="pb-10 text-2xl">New Password:</h1>

          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="relative z-0 w-full mb-5 group py-5">
              <input
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error: </span> {formik.errors.email}
              </div>
            )}

            {/* Password Input */}
            <div className="relative z-0 w-full mb-5 group py-5">
              <input
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                name="newPassword"
                id="newPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                New Password
              </label>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error: </span> {formik.errors.newPassword}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
