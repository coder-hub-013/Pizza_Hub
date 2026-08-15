import { useState } from "react";
import "./Checkout.css";

export default function AddressModal({ closeModal, onAddressCreated }) {

    const [formData, setFormData] = useState({

        fullName: "",
        phone: "",
        houseNo: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        addressType: "Home"
    });

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    }

    function handleSubmit(event) {
        event.preventDefault();
        const newAddress = {
            _id: Date.now().toString(),
            tag: formData.addressType,
            fullName: formData.fullName,
            houseNo: formData.houseNo,
            street: formData.street,
            landmark: formData.landmark,
            phone: formData.phone,
            address: `${formData.houseNo}, ${formData.street}`,
            city: formData.city,
            country: formData.country,
            state: formData.state,
            pincode: formData.pincode
        };

        onAddressCreated(newAddress);

    }

    return (

        <div
            className="checkout-modal-overlay"
            onClick={closeModal}
        >

            <div
                className="checkout-address-modal"
                onClick={(event) => event.stopPropagation()}
            >

                <div className="checkout-modal-header">

                    <h2>

                        Add New Address

                    </h2>

                    <button
                        className="checkout-close-btn"
                        onClick={closeModal}
                    >

                        ✕

                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="checkout-address-form-grid">

                        <div className="checkout-form-group">

                            <label>

                                Full Name

                            </label>

                            <input

                                type="text"

                                name="fullName"

                                value={formData.fullName}

                                onChange={handleChange}

                                placeholder="Enter full name"

                                required

                            />

                        </div>

                        <div className="checkout-form-group">

                            <label>

                                Phone Number

                            </label>

                            <input

                                type="text"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                                placeholder="Enter phone number"

                                required

                            />

                        </div>

                        <div className="checkout-form-group">

                            <label>

                                House No.

                            </label>

                            <input

                                type="text"

                                name="houseNo"

                                value={formData.houseNo}

                                onChange={handleChange}

                                placeholder="Flat / House No."

                                required

                            />

                        </div>

                        <div className="checkout-form-group">

                            <label>

                                Street / Area

                            </label>

                            <input

                                type="text"

                                name="street"

                                value={formData.street}

                                onChange={handleChange}

                                placeholder="Street / Area"

                                required

                            />

                        </div>

                        <div className="checkout-form-group full-width">

                            <label>

                                Landmark

                            </label>

                            <input

                                type="text"

                                name="landmark"

                                value={formData.landmark}

                                onChange={handleChange}

                                placeholder="Nearby landmark"

                            />

                        </div>

                        <div className="checkout-form-group">
                            <label>
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="checkout-form-group">
                            <label>
                                Country
                            </label>

                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="checkout-form-group">

                            <label>

                                State

                            </label>

                            <input

                                type="text"

                                name="state"

                                value={formData.state}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="checkout-form-group">

                            <label>

                                Pincode

                            </label>

                            <input

                                type="text"

                                name="pincode"

                                value={formData.pincode}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>

                    <div className="checkout-address-type">

                        <label>

                            Address Type

                        </label>

                        <div className="checkout-type-buttons">

                            {

                                ["Home", "Office", "Other"].map((type) => (

                                    <button

                                        type="button"

                                        key={type}

                                        className={
                                            formData.addressType === type
                                                ? "checkout-type-btn active"
                                                : "checkout-type-btn"
                                        }

                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                addressType: type
                                            })
                                        }

                                    >

                                        {type}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                    <div className="checkout-modal-footer">

                        <button
                            type="button"
                            className="checkout-cancel-btn"
                            onClick={closeModal}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="checkout-save-btn"
                        >

                            Save Address

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}