import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe("pk_test_51O2D7TSHIJhZN3uaBINey3EVwS99yIBBcn6BAeHucaDH38jm7gmq9tbdh6FZTNyE9mgaDoFmc9PIfT67dn3WdAHd00HB4lXmrn");
export default function App() {
    return (
        <Elements stripe={stripePromise} >
            <CheckoutForm />
        </Elements>
    );
};

