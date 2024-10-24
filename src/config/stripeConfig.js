import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    'pk_test_51QDTdDEFeh1xqcXXYPQ4FsSKm8OJdpa1fkvtyEcFeycXkYTmmMeJyGUWXqNsvRWq9yQk7WV7EdRlAJuUHX6uGr3500NDjJ52Vr'
)

export default stripePromise