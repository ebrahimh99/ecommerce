import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'


const AllOrders = () => {

    const { id } = jwtDecode(localStorage.getItem("token"))

    const [loading, setLoading] = useState(false);
    const [allOrders, setAllOrders] = useState(null);


    async function getUserOrders() {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

            setAllOrders(data)


            setLoading(false)





        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }



    useEffect(() => {
        getUserOrders()

    }, []);





    if (loading) {
        return <div className="h-screen bg-green-400 flex justify-center items-center">
            <i className='fa-solid fa-spinner fa-spin fa-5x'></i>
        </div>
    }

  




    return (
       

        <section className='py-8 mt-20'>
        <div className="w-full md:w-[90%] lg:w-[75%] m-auto">
    
            {allOrders && allOrders.length > 0 ? (
                allOrders.map((order, idx) => (
                    <div key={idx}>
                        {order.cartItems.map((product, productIdx) => (
                            <div key={productIdx} className="inner w-full p-3 bg-slate-200 shadow-lg my-3">
                                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center w-full gap-6">
                                    <div className='w-full md:w-1/6'>
                                        <img src={product.product.imageCover} alt="" className='w-full m-auto' />
                                    </div>
                                    <div className='w-full md:w-4/6'>
                                        <div className="inner flex  flex-col justify-between items-start ps-5 ">
                                            <div>
                                                <h2 className='text-2xl '>{product.product.title}</h2>
                                            </div>
                                            <div>
                                                <h2 className='text-green-600'>Price: <span className='ps-1'>{product.price} EGP</span></h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full md:w-1/6'>
                                        {/* Additional content or buttons can go here */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div className='w-full bg-slate-100 rounded-md'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-bold text-green-600'>There is no payment history</h2>
                    </div>
                </div>
            )}
    
        </div>
    </section>
    )
}

export default AllOrders
