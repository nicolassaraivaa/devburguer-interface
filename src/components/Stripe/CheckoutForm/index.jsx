import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useCart } from '../../../hooks/CartContext'
import '../styles.css'
import { api } from "../../../services/api";
import { toast } from 'react-toastify'
import {AddressElement} from '@stripe/react-stripe-js';

export function CheckoutForm() {
    const { cartProducts, clearCart } = useCart()
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const { state: { dpmCheckerLink } } = useLocation()

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error("Strip ou Elements com falha, tente novamente!")
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const products = cartProducts.map((product) => {
                    return {
                        id: product.id,
                        quantity: product.quantity,
                        price: product.price
                    }
                })
                const { status } = await api.post(
                    '/orders', { products }, {
                    validateStatus: () => true
                }
                )
                if (status === 200 || status === 201) {
                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
                    }, 3000)
                    clearCart()
                    toast.success('Pedido Realizado com Sucesso!')
                } else if (status === 409) {
                    toast.error('Falha ao realizar seu pedido')
                } else {
                    throw new Error()
                }
            } catch (error) {
                toast.error('Falha no sistema! tente novamente.')
            }
        } else {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)        
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <div className="container">
            <h2 className="title">Realize o Pagamento </h2>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <AddressElement options={{mode: 'shipping'}} className="address"/>
                <button disabled={isLoading || !stripe || !elements} id="submit"
                    className="button"
                >
                    <span id="button-text">
                        {isLoading ?
                            <div className="spinner" id="spinner"></div> :
                            "Pagar agora"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
            <div id="dpm-annotation">
                <p>
                    Os métodos de pagamento são disponibilizados de acordo com a sua região.&nbsp;
                    <a
                        href={dpmCheckerLink}
                        target="_blank"
                        rel="noopener noreferrer" className="link" id="dpm-integration-checker"
                    >
                        Ver métodos de pagamento</a>
                </p>
            </div>
        </div>
    );
}