import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
    const [formData, setFormData] = useState({
        cardnumber: '',
        expirationdate: '',
        cvv: '',
        cardholdername: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const cardNumberRegex = /^\d{16}$/;
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY
        const cvvRegex = /^\d{3}$/;
        const cardholderNameRegex = /^[a-zA-Z\s]+$/;

        if (!cardNumberRegex.test(formData.cardnumber)) {
            newErrors.cardnumber = 'Incorrect entry';
        }
        if (!expirationDateRegex.test(formData.expirationdate)) {
            newErrors.expirationdate = 'Incorrect entry';
        }
        if (!cvvRegex.test(formData.cvv)) {
            newErrors.cvv = 'Incorrect entry';
        }
        if (!cardholderNameRegex.test(formData.cardholdername)) {
            newErrors.cardholdername = 'Incorrect entry';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "cardnumber" || name === "cvv") {
            if (/^\d*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "expirationdate") {
            if (/^[\d/]*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "cardholdername") {
            if (/^[a-zA-Z\s]*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit the form
            console.log('Form submitted', formData);
        }
    };

    return (
        <div className="payment-section">
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="field-group">
                    <label>Card Number *</label>
                    <input
                        type="text"
                        name="cardnumber"
                        placeholder="Enter card number"
                        value={formData.cardnumber}
                        onChange={handleInputChange}
                    />
                    {errors.cardnumber && <span className="error">{errors.cardnumber}</span>}
                </div>
                <div className="field-group">
                    <label>Expiration Date *</label>
                    <input
                        type="text"
                        name="expirationdate"
                        placeholder="MM / YY"
                        value={formData.expirationdate}
                        onChange={handleInputChange}
                    />
                    {errors.expirationdate && <span className="error">{errors.expirationdate}</span>}
                </div>
                <div className="field-group">
                    <label>CVV *</label>
                    <input
                        type="text"
                        name="cvv"
                        placeholder="XXX"
                        value={formData.cvv}
                        onChange={handleInputChange}
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                </div>
                <div className="field-group">
                    <label>Cardholder Name *</label>
                    <input
                        type="text"
                        name="cardholdername"
                        placeholder="Enter cardholder name"
                        value={formData.cardholdername}
                        onChange={handleInputChange}
                    />
                    {errors.cardholdername && <span className="error">{errors.cardholdername}</span>}
                </div>
                <button type="submit">Pay Now</button>
            </form>
        </div>
    );
};

export default Payment;
