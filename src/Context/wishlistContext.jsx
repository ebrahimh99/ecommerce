import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'




export const WishListContext = createContext()

const WishlistContextProvider = ({ children }) => {

    const [wishlistProducts, setwishlistProducts] = useState([]);


    async function addProductToWishlist(productId) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    productId: productId
                }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }


            )

            getUserWishlist();
            return data
        } catch (error) {
            console.log(error);

        }
    }




    async function getUserWishlist() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })



            setwishlistProducts(data.data)

            return data
        } catch (error) {
            console.log(error);
        }
    }




    async function removeSpecificWishlistItem(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );

            getUserWishlist()
            return data
        } catch (error) {
            console.log(error);
        }
    }









    useEffect(function () {

        getUserWishlist()


    }, [])




    return (







        <WishListContext.Provider value={{
            addProductToWishlist,
            removeSpecificWishlistItem,
            wishlistProducts,
        }}>
            {children}
        </WishListContext.Provider>
    )
}

export default WishlistContextProvider
