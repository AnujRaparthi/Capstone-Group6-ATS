import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Payment Failed!</strong>
                <span className="block sm:inline">Unfortunately, the payment process was not successful.</span>
                <div className="mt-4">
                    <Link to="/company-signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Try Again
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
