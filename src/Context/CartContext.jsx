import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './authContext';


export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

    const { token } = useContext(AuthContext)

    const [numOfItems, setNumOfItems] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartId, setcartId] = useState(0);


    





    async function addProductToCart(productId) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: productId
                }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }


            )

            getUserCart();
            return data
        } catch (error) {
            console.log(error);

        }
    }

    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })


            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setcartId(data.data._id)

            return data
        } catch (error) {
            console.log(error);

        }
    }


    async function updateCount(id, counter) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    count: counter,
                },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );

            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setcartId(data.data._id)

            return data

        } catch (error) {
            console.log(error);
        }




    }



    async function removeSpecificCartItem(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setcartId(data.data._id)

            return data
        } catch (error) {
            console.log(error);
        }
    }



    async function clearCart() {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            setNumOfItems(0)
            setProducts([])
            setTotalPrice(0)

        } catch (error) {
            console.log(error);
        }
    }




    useEffect(function () {
        if (token !== null) {
            getUserCart()

        }
    }, [token])






    return (
        <CartContext.Provider value={{
            addProductToCart,
            numOfItems,
            products,
            totalPrice,
            updateCount,
            removeSpecificCartItem,
            clearCart,
            cartId,
            setNumOfItems,
            setProducts,
            setTotalPrice,

        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
