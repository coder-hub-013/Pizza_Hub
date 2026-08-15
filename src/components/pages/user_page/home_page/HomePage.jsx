import CustomPizza from "../custom_pizza_page/CustomPizza";
import FeaturedPizzas from "./featuredPizzas/FeaturedPizzas";
import Footer from "./footer/Footer";
import Hero from "./hero/Hero";
import HowItWorks from "./howItWorks/HowItWorks";
import Navbar from "./navbar/Navbar";
import Testimonials from "./testimonials/Testimonials";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";


export default function HomePage() {

    return(
        <div>

            <Navbar />
            <Hero />
            <FeaturedPizzas />
            <CustomPizza />
            <WhyChooseUs />
            <HowItWorks />
            <Testimonials />
            <Footer />

        </div>
    )
}