import { useContext, createContext, useEffect, useState } from "react"; 

const cartContext = createContext({})

export const CartProvider = ({children}) => {
    const [cartProducts, setCartProducts] = useState([])
    
    const putProductInCart = (product) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id)

        let newProductsInCart = [] 

        if (cartIndex >= 0) {
            newProductsInCart = cartProducts

            newProductsInCart[cartIndex].quantity =  
                newProductsInCart[cartIndex].quantity + 1
            
            setCartProducts(newProductsInCart)
        } else {
            product.quantity = 1
            newProductsInCart = [...cartProducts, product]
            setCartProducts(newProductsInCart)
        }
    }

    useEffect(() => {
        console.log(cartProducts)
    }, [cartProducts])

    const clearCart = () => {

    }

    const deleteProduct = (product) => {

    }

    const increaseProduct = (productId) => {

    }

    const decreaseProduct = (productId) => {

    }

    return(
        <cartContext.Provider 
        value={{
            cartProducts, 
            putProductInCart, 
            clearCart, 
            deleteProduct, 
            increaseProduct,
            decreaseProduct}}
        >
            {children}
        </cartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(cartContext)

    if(!context){
        throw new Error('useCart must be a valid context')
    }

    return context
}