import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./MaincustomPizzaPage.css";

import { useCart } from "../../../context/cart/useCart";
import LoadingPage from "../loading/LoadingPage";
import StepIndicator from "./StepIndicator";
import BaseStep from "./BaseStep";
import SauceStep from "./SauceStep";
import CheeseStep from "./CheeseStep";
import VegetableStep from "./VegetableStep";
import OrderSummary from "./OrderSummary";
import { useUser } from "../../../context/user/useUser";

export default function MainCustomPizzaPage() {

    const {fetchUserInventory,userInventory,userLoading} = useUser();
    const {addToCart} = useCart();
    const navigate = useNavigate();

    useEffect(() => {
            (async () => {await fetchUserInventory();})();
    }, []);    

    // Current Step
    const [step, setStep] = useState(1);

    // Selected Items
    const [selectedBase, setSelectedBase] = useState(null);

    const [selectedSauce, setSelectedSauce] = useState(null);

    const [selectedCheese, setSelectedCheese] = useState(null);

    const [selectedVegetables, setSelectedVegetables] = useState([]);

    // Next Step
    const nextStep = () => {
        setStep((previous) => previous + 1);
    };

    // Previous Step
    const previousStep = () => {
        setStep((previous) => previous - 1);
    };

    // Add To Cart
    const addCart = (totalPrice) => {

        const customPizza = {
            name: "Custom Pizza",
            type: "custom",
            quantity: 1,
            price: totalPrice,
            customPizza:{
                base: selectedBase,
                sauce: selectedSauce,
                cheese: selectedCheese,
                vegetables: selectedVegetables,
            },
            image:'https://res.cloudinary.com/dw6ux0xmu/image/upload/pizza_image_1_dzfu0u.jpg',
        };
        const result = addToCart(customPizza)

        if(result.success) {
            toast.success(result.message)
            navigate('/cart');
            return;
        } else {
            toast.error(result.message)
        }
        setStep(1);

    };

    if(userLoading) {
        return <LoadingPage />
    }

    
    const hasInventory = userInventory.bases?.length > 0 || userInventory?.sauces?.length > 0 || userInventory?.cheeses?.length > 0 || userInventory?.vegetables?.length > 0;
    return (

        (hasInventory ?<div className="custom-pizza-page">

            <div className="container">

                <h1>Create Your Own Pizza</h1>

                <p className="page-description">
                    Build your pizza by choosing the base, sauce,
                    cheese and vegetables.
                </p>

                <StepIndicator
                    currentStep={step}
                />

                {
                    step === 1 && (

                        <BaseStep
                            bases={userInventory.bases}
                            selectedBase={selectedBase}
                            setSelectedBase={setSelectedBase}
                            nextStep={nextStep}
                        />
                    )
                }
                {
                    step === 2 && (
                        <SauceStep
                            sauces={userInventory.sauces}
                            selectedSauce={selectedSauce}
                            setSelectedSauce={setSelectedSauce}
                            previousStep={previousStep}
                            nextStep={nextStep}
                        />
                    )
                }
                {
                    step === 3 && (
                        <CheeseStep
                            cheeses={userInventory.cheeses}
                            selectedCheese={selectedCheese}
                            setSelectedCheese={setSelectedCheese}
                            previousStep={previousStep}
                            nextStep={nextStep}
                        />
                    )
                }
                {
                    step === 4 && (
                        <VegetableStep
                        vegetables={userInventory.vegetables}
                            selectedVegetables={selectedVegetables}
                            setSelectedVegetables={setSelectedVegetables}
                            previousStep={previousStep}
                            nextStep={nextStep}
                        />
                    )
                }
                {
                    step === 5 && (
                        <OrderSummary
                            selectedBase={selectedBase}
                            selectedSauce={selectedSauce}
                            selectedCheese={selectedCheese}
                            selectedVegetables={selectedVegetables}
                            previousStep={previousStep}
                            addToCart={addCart}
                        />

                    )
                }

            </div>

        </div>:<p>Still There are no such inventory</p>)

    );

}
