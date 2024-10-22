import { createBrowserRouter } from "react-router-dom";

import { Login } from "../containers/Login";
import { Register } from "../containers/Register";
import { Home } from "../containers/Home";
import { Menu } from "../containers/Menu";
import { Header } from "../components/Header/inde";
import {Footer} from "../components/Footer/index"
import { Cart } from "../containers/Cart";

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