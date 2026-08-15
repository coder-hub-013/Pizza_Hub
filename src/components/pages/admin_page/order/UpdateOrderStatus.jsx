import { useState } from "react";
import "./updateOrderStatus.css";

export default function UpdateOrderStatus({ currentStatus,onUpdateStatus }) {

    const [status, setStatus] = useState(currentStatus);
    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateStatus(status);
    };
    return (

        <div className="admin-order-update-status-card">

            <h2>

                Update Order Status

            </h2>

            <form onSubmit={handleSubmit}>

                <div className="admin-order-form-group">

                    <label>

                        Current Status

                    </label>

                    <select

                        value={status}

                        onChange={(event) =>
                            setStatus(event.target.value)
                        }

                    >

                        <option value="ORDER_RECEIVED">

                            Order Received

                        </option>

                        <option value="IN_KITCHEN">

                            In Kitchen

                        </option>

                        <option value="SENT_TO_DELIVERY">

                            Out For Delivery

                        </option>

                        <option value="DELIVERED">

                            Delivered

                        </option>

                    </select>

                </div>

                <button
                    type="submit"
                >

                    Save Changes

                </button>

            </form>

        </div>

    );

}