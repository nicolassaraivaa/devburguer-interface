import { createBrowserRouter } from "react-router-dom";

import { Header } from "../components/Header/inde";
import {Footer} from "../components/Footer/index"
import { Cart, Login, Home, Menu, Register } from "../containers";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Header/>
                <Home />
                <Footer/>
            </>
        )
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/cadastro',
        element: <Register />
    },
    {
        path: '/cardapio',
        element: (
            <>
                <Header/>
                <Menu />
                <Footer/>
            </>
        )
    },
    {
        path: '/carrinho',
        element: <Cart/>
    }
])