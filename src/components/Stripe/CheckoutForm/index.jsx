import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useState } from "react"
import { useLocation } from "react-router-dom"
import './styles.css'

export function CheckoutForm() {
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

        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
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
        </>
    );
}