import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { 
    Elements, 
    CardElement, 
    useStripe, 
    useElements 
} from '@stripe/react-stripe-js';
import api from '../api/axiosConfig';
import Swal from 'sweetalert2';


const STRIPE_PUBLISHABLE_KEY = "pk_test_51SZW5SLpehN8cbsoIa5BYukX3YZTHPnj75PSGVUBrp7FT6TmKqhjk184ktG1sbB2IEY1z517BFQfM10sy81WeBJc001BE4CVBI";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ courseId, coursePrice }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientSecret = async () => {
            if (coursePrice <= 0) return;
            setLoading(true);
            try {
        
                const res = await api.post('/payments/create-payment-intent', { 
                    amount: coursePrice, 
                    courseId 
                });
                setClientSecret(res.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
                Swal.fire('Error', 'Could not initiate payment. Please ensure the course price is correct and try again.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchClientSecret();
    }, [coursePrice, courseId]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: cardElement,
            
                }
            }
        );

        if (error) {
            Swal.fire('Payment Failed', error.message, 'error');
            setLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            
            try {
                const enrollmentRes = await api.post('/payments/confirm-enrollment', {
                    courseId,
                    paymentIntentId: paymentIntent.id,
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    text: enrollmentRes.data.message,
                    confirmButtonText: 'Go to My Classes'
                }).then(() => {
                    navigate('/my-classes', { replace: true });
                });

            } catch (err) {
                console.error("Enrollment Confirmation Error:", err);
                Swal.fire('Warning', 'Payment succeeded, but enrollment confirmation failed. Please contact support with Transaction ID: ' + paymentIntent.id, 'warning');
            }
        }
        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-700 rounded-xl shadow-2xl border border-indigo-500/50 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b pb-3 border-gray-600">Card Information</h3>
            
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#fff',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: {
                                color: '#fa755a',
                                iconColor: '#fa755a',
                            },
                        },
                    }}
                />
            </div>

            <button
                type="submit"
                
                disabled={!stripe || loading || !clientSecret}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
            >
                {loading ? 'Processing...' : `Pay $${coursePrice}`}
            </button>
        </form>
    );
};

const StripeCheckout = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/coursesData.json") 
            .then(res => res.json())
            .then(data => {
                const selected = data.find(c => c._id === id); 
                setCourse(selected);
            })
            .catch(error => console.error("Error fetching course data:", error))
            .finally(() => setLoading(false));
    }, [id]);


    if (loading) return <div className="text-center py-20 text-gray-400">Loading course details...</div>;
    if (!course) return <div className="text-center py-20 text-red-400">Course not found.</div>;
    if (course.price <= 0) return <div className="text-center py-20 text-yellow-400">This course is free. No payment required.</div>;


    return (
        <div className="container mx-auto px-4 py-16 min-h-[80vh] text-white flex justify-center items-center">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">Checkout for: {course.title}</h1>
                <p className="text-center text-2xl font-semibold mb-8 text-yellow-400">Total: ${course.price}</p>
                
            
                <Elements stripe={stripePromise}>
                    <CheckoutForm courseId={course._id} coursePrice={course.price} />
                </Elements>

                <p className="text-xs text-center text-gray-400 mt-6">
                    Powered by Stripe. Your card information is securely processed.
                </p>
            </div>
        </div>
    );
};

export default StripeCheckout;