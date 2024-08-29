import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import ProductSlider from '../ProductSlider/ProductSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Link } from 'react-router-dom/dist';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/wishlistContext';


const Home = () => {

  const { addProductToWishlist, wishlistProducts , removeSpecificWishlistItem } = useContext(WishListContext)

  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  const { data, isLoading } = useQuery("products", getAllProducts)



  const { addProductToCart } = useContext(CartContext);

  async function addProduct(id) {

    const data = await addProductToCart(id)

    if (data) {
      toast.success(data.message)



    } else {
      toast.error("error")

    }

  }



  async function addProductToWishlistOuter(id) {
    const data = await addProductToWishlist(id)
    if (data) {
      toast.success(data.message)
    } else {
      toast.error("error")
    }
  }


  async function removeProductToWishlistOuter(id) {
    const data = await removeSpecificWishlistItem(id)
    if (data) {
      toast.error(data.message)
    } else {
      toast.error("error")
    }
  }  



  if (isLoading) {
    return <div className="h-screen bg-green-400 flex justify-center items-center">
      <i className='fa-solid fa-spinner fa-spin fa-5x'></i>
    </div>
  }






  return (
    <>

      <section className='py-8 mt-10'>
        <div className="w-full md:w-[90%] lg:w-[75%] m-auto">
          <ProductSlider />
          <CategoriesSlider />
          <div className="flex flex-wrap justify-center items-center">



            {data.data.data.map(function (product, idx) {
              const isInWishlist = wishlistProducts.some(item => item.id === product.id);
              return (
                <div key={idx} className="w-full sm:w-1/2 md:w-1/4  p-4 ">
                <div className="inner p-3 bg-slate-200 relative">
                  <Link to={`/ProductDetails/${product.id}`}>
                    <img src={product.imageCover} alt="img" className='w-full' />
                    </Link>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h2 className='text-green-600 mt-3 '>{product.category.name}</h2>
                        <h2 className='mt-3'>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                      </div>
                      <div>
                        {isInWishlist ? (
                          <i 
                          onClick={function(){removeProductToWishlistOuter(product.id) }}
                          className="fa-solid fa-heart pt-5 cursor-pointer" style={{ color: "#ff0000", fontSize: "30px" }}></i>
                        ) : (
                          <i 
                          onClick={function(){addProductToWishlistOuter(product.id)}}
                          className="fa-regular fa-heart pt-5 cursor-pointer"  style={{ color: "#ff0000", fontSize: "30px" }}></i>
                        )}
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-3'>
                      <div>
                        <h4>{product.price} EGP</h4>
                      </div>
                      <div>
                        <h4><i className='fa-solid fa-star text-yellow-400 mr-2'></i> {product.ratingsAverage}</h4>
                      </div>
                    </div>
                  
                  <button type="button"
                    onClick={() => addProduct(product.id)}
                    className="w-full mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Add To Cart
                  </button>
                </div>
              </div>
              )
            })}

          </div>
        </div>
      </section >




    </>



  )
}

export default Home

