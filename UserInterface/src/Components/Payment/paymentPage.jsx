import React, { useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './payment.css'; 

const PaymentPage = () => {
    const location = useLocation();
    const userId = useSelector(state => state.auth.user?.id);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const firstName= location.state?.firstName;
    const [enteredFirstName, setEnteredFirstName]=useState('');
    const lastName= location.state?.lastName;
    const [enteredLastName, setEnteredLastName]=useState('');
    const totalCost = location.state?.totalCost;

    const handlePayment = async () => {
        const numericTotalCost = parseFloat(totalCost);
        const numericEnteredAmount = parseFloat(enteredAmount);
        if (isNaN(numericEnteredAmount)) {
            setPaymentStatus('Invalid entered amount.');
            return;
        }

        if (numericEnteredAmount.toFixed(2) !== numericTotalCost.toFixed(2) || firstName!==enteredFirstName || lastName!==enteredLastName) {
            setPaymentStatus('Total cost and name does not match. Please enter the correct amount and name.');
            return;
        }

        try {

            await axios.post(`http://localhost:8080/cart/${userId}/placeOrder`, {
                userId,
                items: location.state?.cartItems,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            setPaymentStatus('Payment successful! Your order has been placed.');
        
            setEnteredAmount('');
        } catch (error) {
            setPaymentStatus('Payment failed. Please try again.');
            console.error('Failed to process payment:', error);
        }
    };

    const statusClass = paymentStatus.includes('successful') ? 'success' :
                        paymentStatus.includes('does not match') ? 'nomatch' :
                        paymentStatus.includes('failed') ? 'error' : '';

    return (
        <div className='payment-body'>
            <div className="payment-container">
            <h2>Payment</h2>
            {paymentStatus.includes('successful') ? (
                    <div className={`payment-status ${statusClass}`}>
                        {paymentStatus}
                    </div>
                ) : (
                    <>
                        <p>Total Cost: ${totalCost.toFixed(2)}</p>
                        <p>Enter the total amount and first name to confirm payment:</p>
                        <input
                            type="number"
                            value={enteredAmount}
                            onChange={(e) => setEnteredAmount(e.target.value)}
                            placeholder="Enter amount"
                            step="0.01"
                            min="0"
                        />
                        <input
                            type="text"
                            value={enteredFirstName}
                            onChange={(e) => setEnteredFirstName(e.target.value)}
                            placeholder="Enter first name"
                        />
                        <input
                            type="text"
                            value={enteredLastName}
                            onChange={(e) => setEnteredLastName(e.target.value)}
                            placeholder="Enter last name"
                        />
                        <button className="btn-pay" onClick={handlePayment}>Pay Now</button>
                        {paymentStatus && <p className={`payment-status ${statusClass}`}>{paymentStatus}</p>}
                    </>
                )}
        </div>
        </div>
    );
};

export default PaymentPage;