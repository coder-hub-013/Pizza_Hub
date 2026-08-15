import "./testimonials.css";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    city: "Jaipur",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "The custom pizza builder is amazing! The pizza arrived hot and tasted delicious.",
  },
  {
    id: 2,
    name: "Priya Singh",
    city: "Delhi",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "Fast delivery, fresh ingredients, and a very easy ordering experience. Highly recommended!",
  },
  {
    id: 3,
    name: "Amit Verma",
    city: "Mumbai",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    review:
      "Loved the real-time order tracking. The UI is clean and the payment process is smooth.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">

      <div className="testimonial-header">

        <span>TESTIMONIALS</span>

        <h2>What Our Customers Say</h2>

        <p>
          Thousands of happy customers enjoy our freshly prepared pizzas every
          day.
        </p>

      </div>

      <div className="testimonial-grid">

        {reviews.map((review) => (

          <div className="testimonial-card" key={review.id}>

            <div className="customer">

              <img
                src={review.image}
                alt={review.name}
              />

              <div>

                <h3>{review.name}</h3>

                <small>{review.city}</small>

              </div>

            </div>

            <div className="rating">

              {"★★★★★"}

            </div>

            <p>{review.review}</p>

          </div>

        ))}

      </div>

    </section>
  );
}