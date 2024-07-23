import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import emailjs from 'emailjs-com';
import Confetti from 'react-confetti';
import '../Search/Search.css';

const Payment = ({ riderUserName, riderEmail , cost}) => {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleToken = async (token) => {
    const response = await fetch('http://localhost:9000/payment/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token.id,
        cost: 1000, // in cents
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      setPaymentComplete(true);
     
    } else {
      setPaymentComplete(true);
      sendConfirmationEmail();
      //change later
      //setPaymentComplete(true);
      alert('Payment Failed!');
    }
  };

  const sendConfirmationEmail = () => {
    const templateID = 'template_a34i9to';
    const serviceID = 'service_ei1jycj';
    const userID = 'O25MTvtRdtBmJjw3S77ib';

    emailjs.send(serviceID, templateID, userID)
      .then((response) => {
        console.log('Email sent:', response.text);
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };

  return (
    <div>
      {!paymentComplete ? (
        <StripeCheckout
          stripeKey="pk_test_51MvOUrDD4QlicA8Ycj7WcHVavbqaxBPYtdeDh8SC5jwxPn7FbnJilIVpJNkgARfn87XrjoHnMBYMz22Gy6y2yITN00mABOwVyq"
          token={handleToken}
          amount={1000} // in cents
          name="Carpooling app"
          description="Ride payment"
        />
      ) : (

        <div className="success-message" onClick={sendConfirmationEmail}>
          <alert>Payment Successful!</alert>
        </div>
      )}
      {
         
      paymentComplete && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500} recycle={false} />}
    </div>
  );
};

export default Payment;
