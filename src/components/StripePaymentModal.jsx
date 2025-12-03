import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../api/axiosConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CARD_OPTIONS = {

    style: {
        base: {
            color: '#fff', 
            fontSize: '16px',
            '::placeholder': { color: '#87bbfd' },
        },
        invalid: {
            color: '#ffc7ee',
        },
    },
};

const StripePaymentModal = ({ courseId, amount, courseTitle, clientSecret, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setError("Stripe not loaded.");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);


        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: { card: cardElement } }
        );

        if (confirmError) {
            setError(confirmError.message);
            Swal.fire({
                icon: 'error',
                title: 'Payment Failed',
                text: confirmError.message,
                confirmButtonColor: '#dc2626'
            });
            setLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            
            try {
                await api.post('/payments/finalize-enrollment', {
                    paymentIntentId: paymentIntent.id,
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    text: `You are now enrolled in ${courseTitle}.`,
                    confirmButtonColor: '#4f46e5'
                }).then(() => {
                    onClose(); 
                    navigate('/my-classes', { replace: true });
                });

            } catch (enrollmentError) {
                 Swal.fire({
                    icon: 'warning',
                    title: 'Payment Success, Enrollment Issue',
                    text: `Payment succeeded, but we failed to finalize enrollment. Please contact support.`,
                    confirmButtonColor: '#fbbf24'
                });
            }

        } else {
            setError(`Payment status: ${paymentIntent.status}`);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]">
            <div className="bg-gray-800 text-white p-8 rounded-2xl w-full max-w-md mx-4 border-2 border-indigo-600 shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-indigo-400">
                    Pay $ {amount} for {courseTitle}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="bg-red-500 p-3 rounded-md">{error}</div>}
                    
                    <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
                        <CardElement options={CARD_OPTIONS} />
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className="w-full p-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : `Pay $${amount}`}
                    </button>
                    
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full p-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StripePaymentModal;