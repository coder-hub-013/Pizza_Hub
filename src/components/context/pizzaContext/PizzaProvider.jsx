import { useState } from "react";
import { addPizza, getAllPizzas, getPizzas, getPizzaVieId, updatePizzaInventory } from "./pizzaService";
import PizzaContext from "./PizzaContext";

export default function PizzaProvider({ children }) {
    const [pizzas, setPizzas] = useState([]);//admin
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);//user
    const [hasMore, setHasMore] = useState(true);//user
    const [menuPizzas, setMenuPizzas] = useState([]);//user

    // Home Page (Only 5)
    const fetchHomePizzas = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPizzas(1, 5);
            setMenuPizzas(data.pizzas);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const fetchMenuPizzas = async (currentPage = page) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getPizzas(currentPage, 10);

            if (currentPage === 1) {
                setMenuPizzas(data.pizzas);
            } else {
                setMenuPizzas(prev => [...prev, ...data.pizzas]);
            }

            setPage(currentPage);
            setHasMore(data.hasMore);

        } finally {
            setLoading(false);
        }
    };

    const fetchPizzas = async () => {
        try {
            if (loading || !hasMore) return;
            setLoading(true);
            setError(null);

            const data = await getAllPizzas();
            setPizzas(data);
            setHasMore(data?.hasMore);
        } catch (err) {
            console.log(err, 'error')
            setError(err.message || "Failed to fetch pizzas");
        } finally {
            setLoading(false);
        }
    };

    const createPizza = async (newItem) => {
        setLoading(true);
        try {
            setError(null);
            const createdPizza = await addPizza(newItem);
            setPizzas((prev) => [...prev, createdPizza]);
            return createdPizza;
        } catch (err) {
            setError(err.message);
            
        } finally {
            setLoading(false);
            setError(null);
        }
    };

    const editPizzaInventory = async (payload) => {
        try {
            setLoading(true);
            setError(null);
            const updatedItem = await updatePizzaInventory(payload);


            setPizzas((prev) =>
                prev.map((item) =>
                    item._id === updatedItem._id ? updatedItem : item
                )
            );
            return updatedItem;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getPizzaById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const updatedItem = await getPizzaVieId(id);
            return updatedItem.pizza;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const searchPizza = (keyword) => {
        return pizzas.filter((pizza) =>
            pizza.name.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const filterPizza = (category) => {
        return pizzas.filter((pizza) => pizza.category === category);
    };

    return (
        <PizzaContext.Provider
            value={{
                pizzas,
                loading,
                error,
                hasMore,
                menuPizzas,

                fetchMenuPizzas,
                fetchHomePizzas,
                fetchPizzas,
                getPizzaById,
                searchPizza,
                filterPizza,
                createPizza,
                editPizzaInventory
            }}
        >
            {children}
        </PizzaContext.Provider>
    );
}