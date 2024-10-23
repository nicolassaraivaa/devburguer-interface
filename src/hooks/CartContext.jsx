import { useContext, createContext, useEffect, useState } from "react"; 

const cartContext = createContext({})

export const CartProvider = ({children}) => {
    const [cartProducts, setCartProducts] = useState([])
    
    const putProductInCart = (product) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id)

        let newProductsInCart = [] 

        if (cartIndex >= 0) {
            newProductsInCart = [...cartProducts]

            newProductsInCart[cartIndex].quantity =  
                newProductsInCart[cartIndex].quantity + 1
            
            setCartProducts(newProductsInCart)
        } else {
            product.quantity = 1
            newProductsInCart = [...cartProducts, product]
            setCartProducts(newProductsInCart)
        }
        updateLocalStorage(newProductsInCart)
    }

    const clearCart = () => {
        setCartProducts([])

        updateLocalStorage([])
    }

    const deleteProduct = (productId) => {
        const newCart = cartProducts.filter((prd) => prd.id !== productId)

        setCartProducts(newCart)
        updateLocalStorage(newCart)
    }

        
    const increaseProduct = (productId) => {
        const newCart = cartProducts.map((prd)=>{
            return prd.id === productId ? {...prd, quantity: prd.quantity + 1} : prd
        })

        setCartProducts(newCart)
        updateLocalStorage(newCart)
    }

    const decreaseProduct = (productId) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === productId)

        if(cartProducts[cartIndex].quantity > 1){
            const newCart = cartProducts.map((prd)=>{
                return prd.id === productId ? {...prd, quantity: prd.quantity - 1} : prd
            })

            setCartProducts(newCart)
            updateLocalStorage(newCart)
        } else{
            deleteProduct(productId)
        }
    }

    const updateLocalStorage = (products) => {
        localStorage.setItem('devburger:cartIfo', JSON.stringify(products))
    }

    useEffect(() => {
        const clientCartData = localStorage.getItem('devburger:cartIfo')

        if(clientCartData){
            setCartProducts(JSON.parse(clientCartData))
        }

    }, [])

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