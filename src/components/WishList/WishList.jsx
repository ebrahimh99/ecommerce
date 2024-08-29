import React, { useContext } from 'react'
import { WishListContext } from '../../Context/wishlistContext'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
const WishList = () => {

  const { addProductToCart } = useContext(CartContext);

  const { wishlistProducts, removeSpecificWishlistItem } = useContext(WishListContext)








  async function addProduct(id) {

    const data = await addProductToCart(id)

    if (data) {
      toast.success(data.message)
    } else {
      toast.error("error")

    }

  }







  async function removeProduct(id) {

    const data = await removeSpecificWishlistItem(id)

    if (data) {
      toast.error(data.message)
    } else {
      toast.error("error")

    }

  }





















  return (


    <section className='py-8 mt-20'>
    <div className="w-full md:w-[90%] lg:w-[75%] m-auto">
      <div className="flex flex-col flex-wrap justify-center items-center w-full gap-6">

        {wishlistProducts.length === 0 ? (
          <div className="inner w-full p-3 bg-slate-200 shadow-lg">
            <p>Your Wishlist Is Empty</p>
          </div>
        ) : (
          wishlistProducts.map((item, idx) => (
            <div key={idx} className="inner w-full p-3 bg-slate-200 shadow-lg flex flex-wrap justify-center items-center">
              <div className='w-full md:w-1/6'>
                <img src={item.imageCover} alt="" className='w-full m-auto' />
              </div>
              <div className='w-full md:w-4/6'>
                <div className="inner flex flex-col justify-between items-start ps-5">
                  <div>
                    <h2 className='text-2xl'>{item.title}</h2>
                  </div>
                  <div>
                    <h2 className='text-green-600'>Price: <span className='ps-1'>{item.price}</span></h2>
                  </div>
                  <div>
                    <button
                      onClick={() => removeProduct(item._id)}
                      type="button"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center my-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/6'>
                <div className="inner">
                  <button
                    onClick={() => addProduct(item._id)}
                    type="button"
                    className="text-green-700 w-full hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center my-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  </section>
  )
}

export default WishList
