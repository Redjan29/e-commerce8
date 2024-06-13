import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Address.css';

const Address = () => {
    const [addressData, setAddressData] = useState({
        fullname: '',
        address: '',
        city: '',
        postalcode: '',
        country: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateAddress = () => {
        const newErrors = {};
        const lettersRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
        const addressRegex = /^[a-zA-Z0-9\s]+$/; // Letters, numbers and spaces

        if (!addressData.fullname.trim() || !lettersRegex.test(addressData.fullname)) {
            newErrors.fullname = 'Only letters are allowed and this field is required';
        }
        if (!addressData.address.trim() || !addressRegex.test(addressData.address)) {
            newErrors.address = 'Only letters, numbers, and spaces are allowed and this field is required';
        }
        if (!addressData.city.trim() || !lettersRegex.test(addressData.city)) {
            newErrors.city = 'Only letters are allowed and this field is required';
        }
        if (!addressData.postalcode.trim() || !/^\d{5}$/.test(addressData.postalcode)) {
            newErrors.postalcode = 'Must be exactly 5 digits and this field is required';
        }
        if (!addressData.country.trim()) {
            newErrors.country = 'This field is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        if (validateAddress()) {
            navigate('/cart/payment'); // Navigate only if address is valid
        }
    };

    return (
        <div className="address-section">
            <h2>Shipping Address</h2>
            <form onSubmit={handleAddressSubmit}>
                <div className="field-group">
                    <label>Full Name *</label>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter full name"
                        value={addressData.fullname}
                        onChange={handleAddressChange}
                        required
                    />
                    {errors.fullname && <span className="error">{errors.fullname}</span>}
                </div>
                <div className="field-group">
                    <label>Address *</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={addressData.address}
                        onChange={handleAddressChange}
                        required
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div className="inline-fields">
                    <div className="field-group">
                        <label>City *</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Enter city"
                            value={addressData.city}
                            onChange={handleAddressChange}
                            required
                        />
                        {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                    <div className="field-group">
                        <label>Postal Code *</label>
                        <input
                            type="text"
                            name="postalcode"
                            placeholder="Enter postal code"
                            value={addressData.postalcode}
                            onChange={handleAddressChange}
                            required
                        />
                        {errors.postalcode && <span className="error">{errors.postalcode}</span>}
                    </div>
                </div>
                <div className="field-group">
                    <label>Country *</label>
                    <select
                        name="country"
                        value={addressData.country}
                        onChange={handleAddressChange}
                        required
                    >
                        <option value="">Select Country</option>
                        <option value="Spain">Spain</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Belgium">Belgium</option>
                        <option value="France">France</option>
                    </select>
                    {errors.country && <span className="error">{errors.country}</span>}
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default Address;
