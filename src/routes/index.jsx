import { Route, Routes } from "react-router-dom";

import {
    Cart,
    Login,
    Home,
    Menu,
    Register,
    CompletePayment,
    Checkout,
    Orders,
    NewProduct,
    EditProduct,
    Products
} from "../containers";
import { UserLayout } from "../layouts/userLayout";
import { AdminLayout } from "../layouts/AdminLayout";

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<UserLayout />}>
                <Route path='/' element={<Home/>} />
                <Route path='/cardapio' element={<Menu/>} />
                <Route path='/carrinho' element={<Cart/>} />
                <Route path='/checkout' element={<Checkout/>} />
                <Route path='/complete' element={<CompletePayment/>} />
            </Route>

            <Route path="/admin" element={<AdminLayout/>}>
                <Route path="/admin/pedidos" element={<Orders/>} />
                <Route path="/admin/novo-produto" element={<NewProduct/>} />
                <Route path="/admin/editar-produto" element={<EditProduct/>} />
                <Route path="/admin/produtos" element={<Products/>} />
            </Route>

            <Route path='/login' element={<Login/>} />
            <Route path='/cadastro' element={<Register/>} />
        </Routes>
    )
}

/*export const router = createBrowserRouter([
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
    },
    {
        path: '/checkout',
        element: <Checkout/>
    },    {
        path: '/complete',
        element: <CompletePayment/>
    }
])*/