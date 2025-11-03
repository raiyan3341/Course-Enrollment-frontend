import React from 'react';
import { useForm, ValidationError } from '@formspree/react'; 
import Swal from 'sweetalert2'; 

const FORMSPREE_FORM_ID = 'xyzblqoe'; 

const Contact = () => {
   
    const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

    React.useEffect(() => {
        
        if (state.succeeded) {
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you shortly.',
                confirmButtonText: 'Great!',
                confirmButtonColor: '#4f46e5'
            });
        }
        
       
        if (state.errors && state.errors.length > 0 && !state.submitting) {
             Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an issue sending your message. Please check the form and try again.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc2626'
            });
        }
    }, [state.succeeded, state.errors, state.submitting]);


    return (
        <div className="container mx-auto px-4 py-16 min-h-[80vh] text-white">
            
        
            <div className="text-center mb-12">
                <h2 className="text-5xl font-extrabold text-indigo-400 mb-4 drop-shadow-lg">
                    Get In Touch
                </h2>
                <p className="text-xl text-gray-300">
                    All the ways to connect with our dedicated Admin Team
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border-t-4 border-indigo-500 hover:shadow-indigo-500/50 transition duration-500 transform hover:scale-105">
                    <div className="text-4xl text-indigo-400 mb-4">📧</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Email Support</h3>
                    <p className="text-lg text-gray-300">For general inquiries and support</p>
                    <p className="text-2xl font-mono text-pink-400 mt-3 break-words">
                        rayanbin13@gmail.com
                    </p>
                </div>

                <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border-t-4 border-green-500 hover:shadow-green-500/50 transition duration-500 transform hover:scale-105">
                    <div className="text-4xl text-green-400 mb-4">📞</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                    <p className="text-lg text-gray-300">For urgent questions</p>
                    <p className="text-2xl font-mono text-green-400 mt-3">
                        01871093089
                    </p>
                </div>

                <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border-t-4 border-yellow-500 hover:shadow-yellow-500/50 transition duration-500 transform hover:scale-105">
                    <div className="text-4xl text-yellow-400 mb-4">📍</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Office Location</h3>
                    <p className="text-lg text-gray-300">Our physical address</p>
                    <p className="text-2xl font-mono text-yellow-400 mt-3">
                        Shyampur, Dhaka 1204
                    </p>
                </div>
            </div>
            
         
            <div className="mt-8 max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-inner shadow-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Send Us a Message</h3>
                <p className="text-gray-400 mb-4">Fill out your details below for a quick response.</p>
                
              
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        placeholder="Your Name" 
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500" 
                    />

                    {/* Email Field */}
                    <input 
                        type="email" 
                        id="email"
                        name="email" 
                        placeholder="Your Email" 
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500" 
                    />
                  
                    <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                        className="text-red-500 text-sm" 
                    />

                    {/* Message Field */}
                    <textarea 
                        id="message"
                        name="message" 
                        placeholder="Your Message" 
                        rows="4" 
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                    ></textarea>
                    {/* ✅ Message validation message */}
                    <ValidationError 
                        prefix="Message" 
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-sm" 
                    />

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={state.submitting} // Submitting অবস্থায় button disable থাকবে
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
                    >
                        {state.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                
                    <ValidationError errors={state.errors} className="text-red-500 text-sm" />
                </form>
            </div>
        </div>
    );
};

export default Contact;