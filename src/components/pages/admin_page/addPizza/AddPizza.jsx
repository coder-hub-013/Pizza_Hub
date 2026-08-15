import { useState } from "react";
import "./addPizza.css";
import { toast } from "react-toastify";
import { useInventory } from "../../../context/inventoryContext/useInventory";
import { usePizza } from "../../../context/pizzaContext/usePizza";
import LoadingPage from "../../user_page/loading/LoadingPage";

export default function AddPizza() {

    const { inventory,loading } = useInventory();
    const { pizzas, createPizza,error } = usePizza();

    const [pizza, setPizza] = useState({

        name: "",
        description: "",
        image: '',
        base: "",
        sauce: "",
        cheese: "",
        vegetables: [],
        price: "",
        available: true,
    });

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setPizza((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function handleVegetables(e) {

        const { value, checked } = e.target;
        if (checked) {
            setPizza(prev => ({
                ...prev,
                vegetables: [...prev.vegetables, value]
            }));
        } else {
            setPizza(prev => ({
                ...prev,
                vegetables: prev.vegetables.filter(id => id !== value)
            }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const hasEmptyText = !pizza.name || !pizza.description || !pizza.image || !pizza.base || !pizza.sauce || !pizza.cheese || !pizza.price;
        const hasNoVegetables = pizza.vegetables.length === 0;

        if (hasEmptyText || hasNoVegetables) {
            alert("Error: All fields must be filled out, and you must select at least one vegetable!");
            return;
        }
        const result = await createPizza(pizza);
        if(result?.success) {
            toast.success(result?.message);
        } 
        if(error) return toast.error(error);
        resetForm();
    }

    function resetForm() {
        setPizza({
            name: "",
            description: "",
            base: "",
            sauce: "",
            cheese: "",
            vegetables: [],
            price: "",
            image: "",
            available: true,
            featured: false,
        });
    }

    const getItemsByCategory = (category) => {
        return inventory.filter(item => item.category === category);
    };

    if(loading) {
        return <LoadingPage />
    }

    return (

        <div className="admin-add-pizza-addPizzaContainer">

            <div className="admin-add-pizza-pageHeader">

                <h1>Add New Pizza</h1>

                <p>Create a delicious pizza for your customers.</p>

            </div>

            <form
                className="admin-add-pizza-pizzaForm"
                onSubmit={handleSubmit}
            >

                <div className="admin-add-pizza-card">

                    <h2>Basic Information</h2>

                    <div className="admin-add-pizza-formGroup">

                        <label>Pizza Name *</label>

                        <input
                            type="text"
                            name="name"
                            value={pizza.name}
                            onChange={handleChange}
                            placeholder="Margherita Pizza"
                        />

                    </div>

                    <div className="admin-add-pizza-formGroup">

                        <label>Description</label>

                        <textarea
                            rows="4"
                            name="description"
                            value={pizza.description}
                            onChange={handleChange}
                            placeholder="Enter pizza description..."
                        />

                    </div>

                    <div className="admin-add-pizza-row">

                        <div className="admin-add-pizza-formGroup">

                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={pizza.price}
                                onChange={handleChange}
                                placeholder="₹299"
                            />

                        </div>

                    </div>

                </div>

                <div className="admin-add-pizza-card">

                    <h2>Pizza Ingredients</h2>

                    <div className="admin-add-pizza-row">

                        <div className="admin-add-pizza-formGroup">

                            <label>Base</label>

                            <select
                                name="base"
                                value={pizza.base}
                                onChange={handleChange}
                            >

                                <option value="">Select Base</option>
                                {
                                    getItemsByCategory('BASE').map(item => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))
                                }

                            </select>

                        </div>

                        <div className="admin-add-pizza-formGroup">

                            <label>Sauce</label>

                            <select
                                name="sauce"
                                value={pizza.sauce}
                                onChange={handleChange}
                            >

                                <option value="">Select Sauce</option>
                                {
                                    getItemsByCategory("SAUCE").map(item => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))
                                }
                            </select>

                        </div>

                    </div>

                    <div className="admin-add-pizza-row">

                        <div className="admin-add-pizza-formGroup">

                            <label>Cheese</label>

                            <select
                                name="cheese"
                                value={pizza.cheese}
                                onChange={handleChange}
                            >

                                <option value="">Select Cheese</option>
                                {
                                    getItemsByCategory("CHEESE").map(item => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))
                                }

                            </select>

                        </div>

                    </div>

                    <div className="admin-add-pizza-formGroup">
                        <label>Vegetables</label>
                        <div className="admin-add-pizza-vegetableGrid">
                            {
                                getItemsByCategory("VEGETABLE").map((item) => (
                                    <label
                                        key={item._id}
                                        className="admin-add-pizza-checkboxItem"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item._id}
                                            checked={pizza.vegetables.includes(item._id)}
                                            onChange={handleVegetables}
                                            disabled={!item.isAvailable || item.stock === 0}
                                        />
                                        {item.name}{item.stock === 0 && '(OUT OF STOCK)'}
                                    </label>
                                ))
                            }
                        </div>

                    </div>

                </div>


                <div className="admin-add-pizza-card">
                    <h2>Pizza Image</h2>
                    <div className="admin-add-pizza-formGroup">
                        <label>Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={pizza.image}
                            onChange={handleChange}
                            placeholder="Paste Image URL"
                        />
                    </div>

                    {
                        pizza.image &&
                        <div className="admin-add-pizza-preview">
                            <img
                                src={pizza.image}
                                alt="preview"
                            />
                        </div>
                    }
                </div>

                <div className="admin-add-pizza-card">

                    <h2>Settings</h2>

                    <label className="admin-add-pizza-checkboxItem">

                        <input
                            type="checkbox"
                            name="available"
                            checked={pizza.available}
                            onChange={handleChange}
                        />

                        Available for Order

                    </label>

                </div>

                <div className="admin-add-pizza-buttonGroup">

                    <button
                        type="button"
                        className="admin-add-pizza-resetBtn"
                        onClick={resetForm}
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        className="admin-add-pizza-saveBtn"
                    >
                        Save Pizza
                    </button>
                </div>
            </form>
        </div>
    );
}