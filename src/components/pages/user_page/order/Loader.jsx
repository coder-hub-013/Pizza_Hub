export default function Loader() {

    return (

        <section className="loader-page">

            {

                Array.from({ length: 3 }).map((_, index) => (

                    <div
                        className="loader-card"
                        key={index}
                    >

                        <div className="loader-header">

                            <div className="loader-title skeleton"></div>

                            <div className="loader-price skeleton"></div>

                        </div>

                        <div className="loader-status skeleton"></div>

                        <div className="loader-line skeleton"></div>

                        <div className="loader-line skeleton"></div>

                        <div className="loader-button skeleton"></div>

                    </div>

                ))

            }

        </section>

    );

}