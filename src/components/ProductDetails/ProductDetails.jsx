
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import axios from 'axios';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/wishlistContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addProductToCart } = useContext(CartContext);
    const [load, setLoad] = useState(false);
    const { data, isLoading, isError, error } = useQuery(`SingleProduct${id}`, getSingleProduct);

    const { wishlistProducts, addProductToWishlist, removeSpecificWishlistItem } = useContext(WishListContext);

    async function getSingleProduct() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    async function addProduct() {
        setLoad(true);
        const data = await addProductToCart(id);

        if (data) {
            toast.success(data.message);
            setLoad(false);
        } else {
            toast.error("error");
            setLoad(false);
        }
    }

    if (isLoading) {
        return (
            <div className="h-screen bg-green-400 flex justify-center items-center">
                <i className='fa-solid fa-spinner fa-spin fa-5x'></i>
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    async function addProductToWishlistOuter(id) {
        const data = await addProductToWishlist(id);
        if (data) {
            toast.success(data.message);
        } else {
            toast.error("error");
        }
    }

    async function removeProductToWishlistOuter(id) {
        const data = await removeSpecificWishlistItem(id);
        if (data) {
            toast.error(data.message);
        } else {
            toast.error("error");
        }
    }

    
    const isInWishlist = wishlistProducts.some(product => product.id === id);

    return (
        <section className='py-8 mt-20'>
            <div className="w-full md:w-[90%] lg:w-[75%] m-auto">
                <div className="flex flex-wrap justify-center items-center">
                    <div className='w-full sm:w-full md:w-1/3 lg:w-1/3'>
                        <div className="inner px-5">
                            <img src={data.data.data.imageCover} alt="" />
                        </div>
                    </div>
                    <div className='w-full sm:w-full md:w-2/3 lg:w-2/3'>
                        <div className="inner px-5">
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h2 className='text-2xl py-1 font-bold'>{data.data.data.title}</h2>
                                    <h2 className='py-1 text-gray-500'>{data.data.data.description}</h2>
                                    <h2 className='py-1'>{data.data.data.category.name}</h2>
                                </div>
                                <div>
                                    {isInWishlist ? (
                                        <i
                                            onClick={() => removeProductToWishlistOuter(id)}
                                            className="fa-solid fa-heart pt-5 cursor-pointer"
                                            style={{ color: "#ff0000", fontSize: "30px" }}>
                                        </i>
                                    ) : (
                                        <i
                                            onClick={() => addProductToWishlistOuter(id)}
                                            className="fa-regular fa-heart pt-5 cursor-pointer"
                                            style={{ color: "#ff0000", fontSize: "30px" }}>
                                        </i>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-between items-center py-1 pe-5'>
                                <div>
                                    <h4>{data.data.data.price} EGP</h4>
                                </div>
                                <div>
                                    <h4><i className='fa-solid fa-star text-yellow-400 mr-2'></i> {data.data.data.ratingsAverage}</h4>
                                </div>
                            </div>
                            <button
                                onClick={addProduct}
                                type="button"
                                className="w-full mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                {load ? <i className='fa-solid fa-spinner fa-spin text-white text-2xl'></i>
                                    :
                                    "Add To Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;
