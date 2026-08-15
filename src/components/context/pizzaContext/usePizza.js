import { useContext } from "react";
import PizzaContext from "./PizzaContext";

export const usePizza = () => {
    return useContext(PizzaContext);
}