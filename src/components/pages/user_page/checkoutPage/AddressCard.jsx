import "./Checkout.css";

export default function AddressCard({
    address,
    selected,
    onSelect,
    onEdit,
    onDelete
}) {

    return (

        <label
            className={`checkout-address-card ${selected ? "selected" : ""}`}
        >

            <input
                type="radio"
                checked={selected}
                onChange={onSelect}
            />

            <div className="checkout-address-info">

                <div className="checkout-address-header">

                    <span className="checkout-address-tag">

                        {address.addressType}

                    </span>

                    <div className="checkout-address-actions">

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();

                                if (onEdit) {

                                    onEdit(address);

                                }
                            }}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            className="checkout-delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();

                                if (onDelete) {

                                    onDelete(address._id);

                                }
                            }}
                        >
                            Delete
                        </button>

                    </div>

                </div>

                <h3>

                    {address.name}

                </h3>

                <p>

                    {address.houseNo}, {address.landmark} - {address.street}

                </p>

                <p>

                    {address.city}, {address.state}, {address.country} - {address.zipCode}

                </p>

                <div className="checkout-address-footer">

                    <span>

                        +91 {address.mobileNumber}

                    </span>

                    {

                        selected && (

                            <span className="checkout-deliver-badge">

                                ✓ Deliver Here

                            </span>

                        )

                    }

                </div>

            </div>

        </label>

    );

}