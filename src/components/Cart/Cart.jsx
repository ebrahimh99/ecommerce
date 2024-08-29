import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';


const Cart = () => {

    const { products, totalPrice, updateCount, removeSpecificCartItem, clearCart } = useContext(CartContext)
    

    


    return (
        <section className='py-8 mt-20'>
            <div className="w-full md:w-[90%] lg:w-[75%] m-auto">


                <div className="flex flex-wrap justify-center items-center gap-5">


                    {products.length != 0 ? <>
                        <div className='w-full bg-slate-100 rounded-md'>
                            <div className='pb-8  p-5'>
                                <h1 className='text-4xl font-semibold'>Shop Cart:</h1>
                            </div>
                            <div className='flex flex-wrap justify-between items-center pb-8 p-5'>
                                <div >
                                    <h2 className='text-xl text-green-600'>Total Cart Price: <span className='px-3'>{totalPrice} EGP</span></h2>
                                </div>
                                <div>
                                    <Link to="/payment">
                                        <button
                                            type="button"
                                            className="mx-2  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            Proceed To Buy
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {products?.map(function (item, idx) {
                            return (
                                <div key={idx} className='w-full'>
                                    <div className="inner p-3 bg-slate-200 shadow-lg flex flex-wrap justify-center items-center">
                                        <div className='w-full md:w-1/6'>
                                            <img src={item.product.imageCover} alt="" className='w-full m-auto' />
                                        </div>
                                        <div className='w-full md:w-4/6'>
                                            <div className="inner flex  flex-col justify-between items-start ps-5 ">
                                                <div>
                                                    <h2 className='text-2xl '>{item.product.title}</h2>
                                                </div>
                                                <div>
                                                    <h2 className='text-green-600'>Price: <span className='ps-1'>{item.price}</span></h2>
                                                </div>

                                                <div>
                                                    <button
                                                        onClick={function () {
                                                            removeSpecificCartItem(item.product.id)
                                                        }}
                                                        type="button"
                                                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  my-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                                                        Remove Item
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='w-full md:w-1/6'>
                                            <div className="inner flex flex-wrap justify-center items-center gap-5">
                                                <button
                                                    onClick={function () {
                                                        updateCount(item.product.id, item.count + 1)
                                                    }}
                                                    type="button"
                                                    className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center  my-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                                                    +
                                                </button>

                                                <h2>{item.count}</h2>
                                                <button
                                                    onClick={function () {
                                                        updateCount(item.product.id, item.count - 1)
                                                    }}
                                                    disabled={item.count == 0 ? true : false}
                                                    type="button"
                                                    className={` ${item.count == 0 ? "disabled:opacity-25" : ""} "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center  my-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"`}>
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <button
                            onClick={function () {
                                clearCart()
                            }}
                            type="button"
                            className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Clear Cart
                        </button>
                    </> :
                        <div className='w-full bg-slate-100 rounded-md'>
                            <div className='p-5'>
                                <h1 className='text-4xl font-semibold'>Shop Cart:</h1>
                            </div>
                            <div className='p-5'>
                                <h2 className='text-3xl font-bold text-green-600'>your cart is empty</h2>
                            </div>
                        </div>
                    }


                </div>

            </div>
        </section >
    )
}

export default Cart
