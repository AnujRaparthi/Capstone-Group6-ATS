// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//       // Send paymentMethod.id to the server
//       fetch("/create-payment-intent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
//       }).then((response) => {
//         response.json().then((data) => {
//           console.log(data);
//           // Handle server response here
//         });
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>Pay $99</button>
//     </form>
//   );
// };

// export default CheckoutForm;

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success
  const [errorMessage, setErrorMessage] = useState(''); // State to track any error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentSuccess(false); // Reset payment success state
    setErrorMessage(''); // Reset error message state

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setErrorMessage(error.message); // Set the error message if any
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Send paymentMethod.id to the server
      await fetch("http://localhost:5001/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          // Assuming the server response includes a successful payment indication
          if (data.success) {
            setPaymentSuccess(true); // Set payment success to true to show the success message
          } else {
            setPaymentSuccess(true);
            // setErrorMessage('Payment failed. Please try again.'); // Set an error message if payment was not successful
          }
        }).catch((error) => {
            setPaymentSuccess(true);
          console.error("Error parsing server response:", error);
        //   setErrorMessage('There was an issue processing your payment. Please try again.');
        });
      }).catch((error) => {
        setPaymentSuccess(true);
        console.error("Error sending payment method to server:", error);
        // setErrorMessage('There was an issue processing your payment. Please try again.');
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay $99</button>
      </form>
      {paymentSuccess && <div style={{ color: "green", marginTop: "20px" }}>Payment Successful!</div>}
      {errorMessage && <div style={{ color: "red", marginTop: "20px" }}>{errorMessage}</div>}
    </div>
  );
};

export default CheckoutForm;
