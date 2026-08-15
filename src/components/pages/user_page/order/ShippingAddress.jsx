export default function ShippingAddress({ address }) {

    if (!address) {

        return null;

    }

    return (

        <section className="shipping-card">

            <div className="shipping-header">

                <h2>

                    📍 Delivery Address

                </h2>

            </div>

            <div className="shipping-body">

                <div className="address-user">

                    <h3>

                        {address.name}

                    </h3>

                    {

                        address.mobileNumber && (

                            <p>

                                📞 {address.mobileNumber}

                            </p>

                        )

                    }

                </div>

                <div className="address-details">

                    <p>

                        {address.houseNo} ,&nbsp;{address.street}

                    </p>

                    {

                        address.landmark && (

                            <p>

                                {address.landmark}

                            </p>
                            

                        )

                    }
                    

                    <p>

                        {address.city}, {address.state}

                    </p>

                    <p>

                        {address.country || "India"} - {address.zipCode}

                    </p>

                </div>

            </div>

        </section>

    );

}