import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const Payment = () => {

    const { cartId, setNumOfItems, setProducts, setTotalPrice } = useContext(CartContext)



    const [city, setCity] = useState("");
    const [phone, setphone] = useState("");
    const [details, setdetails] = useState("");

    async function cashPayment() {
        const cashOrderObject = {

            shippingAddress: {
                details,
                phone,
                city
            }
        }

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                cashOrderObject,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            )
            setNumOfItems(0);
            setProducts([]);
            setTotalPrice(0);
            toast.success(data.status);
        } catch (error) {
            toast.error(data.status);
        }

    }




    async function onlinePayment() {
        const cashOrderObject = {

            shippingAddress: {
                details,
                phone,
                city
            }
        }
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://ebrahimh99.github.io/ecommerce`,
                cashOrderObject,

                {
                    headers: {
                        token: localStorage.getItem("token")
                    },
                   
                },
            )
            window.open(data.session.url) 
            toast.success(data.status);
        } catch (error) {
            toast.error(data.status)
        }
    }



    return (
        <section className="py-8 mt-40">

            <div className="w-full md:w-[90%] lg:w-[75%] m-auto">
                <div className="flex flex-wrap justify-center items-center ">

                    <h2 className="text-center text-3xl font-semibold text-green-600">
                        Payment
                    </h2>


                    <div className="w-full flex flex-wrap justify-center items-center gap-8">
                        {/* Phone Number input */}

                        <div className="relative z-0 w-full mb-5 group ">
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                onChange={function (e) {
                                    setphone(e.target.value)
                                }}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />


                            <label htmlFor="phoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Phone Number
                            </label>
                        </div>

                        {/* City input */}

                        <div className="relative z-0 w-full mb-5 group ">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                onChange={function (e) {
                                    setCity(e.target.value)
                                }}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />


                            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                City
                            </label>
                        </div>

                        {/* Details input */}

                        <div className="relative z-0 w-full mb-5 group ">
                            <input
                                type="text"
                                name="details"
                                id="details"
                                onChange={function (e) {
                                    setdetails(e.target.value)
                                }}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />


                            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Details
                            </label>
                        </div>


                        <div className="flex flex-wrap justify-center items-center w-full ">
                            <div className="w-full md:w-1/2 p-5">
                                <button
                                    type="button"
                                    onClick={cashPayment}
                                    className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Cash Payment
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 p-5">
                                <button
                                    type="button"
                                    onClick={onlinePayment}
                                    className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Online Payment
                                </button>
                            </div>

                        </div>

                        


                    </div>


                </div>
            </div>
        </section>
    )
}

export default Payment
